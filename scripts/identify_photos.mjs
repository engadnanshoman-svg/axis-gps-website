import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ZAI = require('/home/z/.bun/install/global/node_modules/z-ai-web-dev-sdk').default;

import fs from 'fs';
import path from 'path';

async function main() {
  const zai = await ZAI.create();
  
  const teamDir = '/home/z/my-project/public/team';
  const custDir = '/home/z/my-project/public/customers';
  
  function encodeImage(filePath) {
    const buf = fs.readFileSync(filePath);
    return `data:image/jpeg;base64,${buf.toString('base64')}`;
  }
  
  const walaaUrl = encodeImage(path.join(teamDir, 'walaa.jpg'));
  const sajaUrl = encodeImage(path.join(teamDir, 'saja_new.jpg'));
  
  const dscFiles = [
    'customer-dsc-01.jpg', 'customer-dsc-02.jpg', 'customer-dsc-03.jpg',
    'customer-dsc-04.jpg', 'customer-dsc-05.jpg', 'customer-dsc-06.jpg',
    'customer-dsc-07.jpg', 'customer-dsc-08.jpg', 'customer-dsc-09.jpg',
    'customer-dsc-10.jpg', 'customer-dsc-13.jpg', 'customer-dsc-14.jpg'
  ];
  
  for (const dscFile of dscFiles) {
    const dscUrl = encodeImage(path.join(custDir, dscFile));
    
    try {
      const response = await zai.chat.completions.createVision({
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: `I have two reference photos of team members: first photo is Walaa (ولاء البكري), second photo is Saja (سجى مسالمة). The third photo is a customer/group photo. Does either Walaa or Saja appear in this group photo? Answer ONLY one of: WALAA_FOUND, SAJA_FOUND, BOTH_FOUND, or NONE_FOUND. Then briefly explain why.` },
            { type: 'image_url', image_url: { url: walaaUrl } },
            { type: 'image_url', image_url: { url: sajaUrl } },
            { type: 'image_url', image_url: { url: dscUrl } }
          ]
        }],
        thinking: { type: 'disabled' }
      });
      
      const result = response.choices[0]?.message?.content || 'No response';
      console.log(`${dscFile}: ${result}`);
    } catch (e) {
      console.log(`${dscFile}: ERROR - ${e.message}`);
      if (e.message.includes('429')) {
        console.log('Rate limited, waiting 30s...');
        await new Promise(r => setTimeout(r, 30000));
        // Retry
        try {
          const response = await zai.chat.completions.createVision({
            messages: [{
              role: 'user',
              content: [
                { type: 'text', text: `Does either person from the first two reference photos appear in the third group photo? Answer: WALAA_FOUND, SAJA_FOUND, BOTH_FOUND, or NONE_FOUND. Brief explanation.` },
                { type: 'image_url', image_url: { url: walaaUrl } },
                { type: 'image_url', image_url: { url: sajaUrl } },
                { type: 'image_url', image_url: { url: dscUrl } }
              ]
            }],
            thinking: { type: 'disabled' }
          });
          const result = response.choices[0]?.message?.content || 'No response';
          console.log(`${dscFile} (retry): ${result}`);
        } catch (e2) {
          console.log(`${dscFile} (retry failed): ${e2.message}`);
        }
      }
    }
    
    await new Promise(r => setTimeout(r, 6000));
  }
}

main().catch(console.error);
