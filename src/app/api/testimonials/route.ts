import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IS_VERCEL = !!process.env.VERCEL

// KV storage helpers for Vercel
function getKv() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { kv } = require('@vercel/kv')
    return kv
  } catch {
    return null
  }
}

const KV_KEY = 'axis:testimonials'

async function getKvTestimonials(): Promise<any[]> {
  const kv = getKv()
  if (!kv) return []
  try {
    const data = await kv.get<any[]>(KV_KEY)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

async function saveKvTestimonials(testimonials: any[]): Promise<boolean> {
  const kv = getKv()
  if (!kv) return false
  try {
    await kv.set(KV_KEY, testimonials)
    return true
  } catch {
    return false
  }
}

// SQLite helpers for local development
const DB_DIR = IS_VERCEL ? '/tmp' : path.join(process.cwd(), 'db')
const DB_PATH = path.join(DB_DIR, 'custom.db')

function getDb() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require('better-sqlite3')

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true })
  }

  const db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')

  db.prepare(`
    CREATE TABLE IF NOT EXISTS Testimonial (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      company TEXT,
      text TEXT NOT NULL,
      rating INTEGER NOT NULL,
      approved INTEGER DEFAULT 1,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `).run()

  return db
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

/* ── GET: Fetch approved testimonials ── */
export async function GET() {
  try {
    let testimonials: any[] = []

    if (IS_VERCEL) {
      // On Vercel: use KV (persistent) + fallback to SQLite /tmp
      const kvTestimonials = await getKvTestimonials()
      if (kvTestimonials.length > 0) {
        testimonials = kvTestimonials.filter((t: any) => t.approved === 1 || t.approved === true)
      } else {
        // Fallback: try SQLite /tmp (may have data from before KV migration)
        try {
          const db = getDb()
          testimonials = db.prepare(
            'SELECT * FROM Testimonial WHERE approved = 1 ORDER BY createdAt DESC'
          ).all()
          db.close()

          // Migrate to KV for persistence
          if (testimonials.length > 0) {
            await saveKvTestimonials(testimonials)
          }
        } catch {
          // No SQLite data either
        }
      }
    } else {
      // Local: use SQLite
      const db = getDb()
      testimonials = db.prepare(
        'SELECT * FROM Testimonial WHERE approved = 1 ORDER BY createdAt DESC'
      ).all()
      db.close()
    }

    // Sort by date descending
    testimonials.sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'فشل في تحميل المشاركات' },
      { status: 500 }
    )
  }
}

/* ── POST: Submit a new testimonial ── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, company, text, rating } = body

    if (!name || !text || !rating) {
      return NextResponse.json(
        { error: 'الرجاء ملء جميع الحقول المطلوبة' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'التقييم يجب أن يكون بين 1 و 5' },
        { status: 400 }
      )
    }

    const id = generateId()
    const now = new Date().toISOString()
    const testimonial = {
      id,
      name,
      company: company || null,
      text,
      rating,
      approved: 1,
      createdAt: now,
      updatedAt: now,
    }

    if (IS_VERCEL) {
      // On Vercel: save to KV (persistent)
      const existing = await getKvTestimonials()
      existing.push(testimonial)
      await saveKvTestimonials(existing)

      // Also save to /tmp SQLite as backup
      try {
        const db = getDb()
        db.prepare(
          'INSERT INTO Testimonial (id, name, company, text, rating, approved, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        ).run(id, name, company || null, text, rating, 1, now, now)
        db.close()
      } catch {
        // Non-critical backup
      }
    } else {
      // Local: save to SQLite
      const db = getDb()
      db.prepare(
        'INSERT INTO Testimonial (id, name, company, text, rating, approved, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      ).run(id, name, company || null, text, rating, 1, now, now)
      db.close()
    }

    // Send email notification
    try {
      const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'eng.adnan.shoman@gmail.com'
      function getResend() {
        const apiKey = process.env.RESEND_API_KEY
        if (!apiKey) return null
        const { Resend } = require('resend')
        return new Resend(apiKey)
      }

      const starsHtml = Array.from({ length: 5 }, (_, i) =>
        i < rating ? '★' : '☆'
      ).join('')

      const reviewHtml = `
        <div dir="rtl" style="font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #FBBF24, #F59E0B); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">⭐ مشاركة جديدة من شركاء النجاح</h1>
          </div>
          <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold; width: 120px;">الاسم</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">الشركة</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${company || 'غير محدد'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">التقييم</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #F59E0B; font-size: 24px;">${starsHtml} (${rating}/5)</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-weight: bold; vertical-align: top;">المشاركة</td>
                <td style="padding: 12px 0; color: #1e293b; line-height: 1.8;">${text}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #FFFBEB; border-radius: 8px; border-right: 4px solid #F59E0B;">
              <p style="margin: 0; color: #92400E; font-size: 14px;">
                تم إرسال هذه المشاركة من قسم "شركاء النجاح" على موقع اكسيس للحلول الهندسية — وهي الآن معروضة على الموقع تلقائياً
              </p>
            </div>
          </div>
        </div>
      `

      const resend = getResend()
      if (resend) {
        await resend.emails.send({
          from: 'اكسيس للحلول الهندسية <onboarding@resend.dev>',
          to: TO_EMAIL,
          subject: `مشاركة جديدة من ${name} - تقييم ${rating}/5 ⭐`,
          html: reviewHtml,
        })
      }
    } catch (emailError) {
      console.error('Email notification failed (non-critical):', emailError)
    }

    return NextResponse.json({
      success: true,
      message: 'تم إرسال مشاركتك بنجاح وستظهر قريباً على الموقع',
      testimonial: { id, name, company, text, rating, approved: 1, createdAt: now }
    })
  } catch (error) {
    console.error('Testimonial submission error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500 }
    )
  }
}
