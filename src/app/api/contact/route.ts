import { NextRequest, NextResponse } from 'next/server';

const TO_EMAILS = ['adnan@axis-gps.com'];

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  // Lazy import to avoid build-time errors
  const { Resend } = require('resend');
  return new Resend(apiKey);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'الرجاء ملء جميع الحقول المطلوبة' },
        { status: 400 }
      );
    }

    // Build email content
    const serviceLabels: Record<string, string> = {
      'gps': 'أجهزة GPS و RTK',
      'total-station': 'أجهزة التوتل ستيشن',
      'scanning': 'المسح الضوئي ثلاثي الأبعاد',
      'gis': 'أنظمة GIS والخرائط',
      'monitoring': 'أنظمة مراقبة التحرك',
      'training': 'التدريب والدعم الفني',
    };

    const serviceName = service ? (serviceLabels[service] || service) : 'غير محدد';

    const htmlContent = `
      <div dir="rtl" style="font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 12px;">
        <div style="background: linear-gradient(135deg, #0d9488, #0e7490); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 22px;">طلب عرض جديد - اكسيس</h1>
        </div>
        <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold; width: 120px;">الاسم</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">البريد الإلكتروني</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; direction: ltr; text-align: right;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">رقم الهاتف</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; direction: ltr; text-align: right;">${phone || 'غير محدد'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">نوع الخدمة</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0d9488; font-weight: bold;">${serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-weight: bold; vertical-align: top;">تفاصيل المشروع</td>
              <td style="padding: 12px 0; color: #1e293b; line-height: 1.8;">${message}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f0fdfa; border-radius: 8px; border-right: 4px solid #0d9488;">
            <p style="margin: 0; color: #0d9488; font-size: 14px;">
              تم إرسال هذا الطلب من نموذج الاتصال على موقع اكسيس للحلول الهندسية المتقدمة
            </p>
          </div>
        </div>
      </div>
    `;

    // Check if Resend API key is configured
    const resend = getResend();
    if (resend) {
      // Send email using Resend
      const { error } = await resend.emails.send({
        from: 'اكسيس للحلول الهندسية <onboarding@resend.dev>',
        to: TO_EMAILS,
        subject: `طلب عرض جديد من ${name} - ${serviceName}`,
        html: htmlContent,
      });

      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json(
          { error: 'حدث خطأ في إرسال البريد الإلكتروني' },
          { status: 500 }
        );
      }
    } else {
      // No API key - log to console and still return success
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 NEW CONTACT FORM SUBMISSION:');
      console.log(`  Name: ${name}`);
      console.log(`  Email: ${email}`);
      console.log(`  Phone: ${phone || 'N/A'}`);
      console.log(`  Service: ${serviceName}`);
      console.log(`  Message: ${message}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }

    return NextResponse.json({ success: true, message: 'تم إرسال رسالتك بنجاح' });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500 }
    );
  }
}
