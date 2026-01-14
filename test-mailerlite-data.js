// Quick Test: Send sample data to MailerLite to verify custom fields work

const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGU4OWRjNmQxYmM3MzNkNzU4Y2UwNDkxYzRiMDZlYzMzZGI3NDgyOTlkOTVhMzQ1MDhlOTJhZDlkNDA2OWVkZjI5YTgxNjM3YjkxYTUyNmUiLCJpYXQiOjE3NjgzMzE0MzAuNzE3NjQ2LCJuYmYiOjE3NjgzMzE0MzAuNzE3NjQ5LCJleHAiOjQ5MjQwMDUwMzAuNzA0MDY1LCJzdWIiOiIyMDM0NTEyIiwic2NvcGVzIjpbXX0.WsZPCHSNc9sIbrZKR4ka5VgcpDdW08xCc8AWdcPd9oDMRvsjAvKuSsdg_FEL5q1haJV1toDczF6nfAR8rFQ9KSG8Trdatuy03n7oaqXzitZFKz7aeFD_3_rYLJz0WqPuoK6mqLwTv6wAB-t1z2Wy8e3KC-L_N1nlYuzhneFI5a4jxhc8ayUwxThbuxJvMd5sNipQWi4-OVeqbAF6dLgXF32Q33SvRn_dzw0Jy76871clSMGpMvzZ60fXMXLByhviyorE7dIP71dD1yFLDWyN8m3ED07r7ncnX__1PWuLxGs0qzC24W9FlCOIJJlQ_c0Lso_q2lFIAnPCK6I81uL16VpxGE3y0O-P21_c1Azj0Lwj-lSdmk0V1mhBy_YufJDkzEYHnXiIcoQdLvUfK1nUbFz9gg10MEVCPa0bXqRAmTYiNzwri2rQUF11JEBTQX_AWFEJgo-ikkHcC3ln81bvnSxwZrq3XEd2xIUDGOKD-qr2IBl866VSCDpGCfTuDKWd6-f36oNrdGa_mTfIKPbla31-ErUY4pdYSEAeVCZmhrXB-TzXOB8z0aQY9XR5S-2YH9C7c_4SJbErJLtGlPnd6hjUtqT42I1qY9SW4X59jgNtBo-MSAHC7-lVu5dAUm6Lnyz95UYjXR-lyJyg7oX9LgFi7ypmwNeG1wA-gX1Yau0';
const MAILERLITE_GROUP_ID = '176508406386918528';

async function testMailerLiteData() {
  console.log('🧪 Testing MailerLite Custom Fields...');
  console.log('='.repeat(60));
  
  const testEmail = `test+${Date.now()}@example.com`;
  
  const subscriberData = {
    email: testEmail,
    fields: {
      name: 'Test User',
      archetype: 'The Sage',
      archetype_percent: 32,
      test_date: new Date().toLocaleDateString('en-US'),
      archetype_1: 'The Sage',
      archetype_1_percent: 32,
      archetype_2: 'The Visionary',
      archetype_2_percent: 24,
      archetype_3: 'The Builder',
      archetype_3_percent: 18
    },
    groups: [MAILERLITE_GROUP_ID]
  };
  
  console.log('\n📤 Sending test data:');
  console.log(JSON.stringify(subscriberData, null, 2));
  
  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`
      },
      body: JSON.stringify(subscriberData)
    });
    
    const result = await response.json();
    
    console.log('\n📥 Response:');
    console.log(JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('\n✅ SUCCESS! Test subscriber created.');
      console.log('\n🔍 Verify in MailerLite:');
      console.log('   1. Go to: https://dashboard.mailerlite.com');
      console.log('   2. Click "Subscribers"');
      console.log('   3. Search for:', testEmail);
      console.log('   4. Click on the subscriber');
      console.log('   5. Scroll to "Custom Fields" section');
      console.log('\n✅ You should see ALL these fields:');
      console.log('   - Archetype: The Sage');
      console.log('   - Archetype Percent: 32');
      console.log('   - Test Date:', subscriberData.fields.test_date);
      console.log('   - Archetype 1: The Sage (32%)');
      console.log('   - Archetype 2: The Visionary (24%)');
      console.log('   - Archetype 3: The Builder (18%)');
      
      console.log('\n🎉 Custom Fields are working correctly!');
    } else {
      console.error('\n❌ Failed to create test subscriber');
      console.error('Status:', response.status);
      console.error('Error:', result.message || 'Unknown error');
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

testMailerLiteData();
