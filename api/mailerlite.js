// 📧 Vercel Serverless Function for MailerLite API
// MailerLite API v2 - https://developers.mailerlite.com/docs/

// MailerLite API configuration
const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGU4OWRjNmQxYmM3MzNkNzU4Y2UwNDkxYzRiMDZlYzMzZGI3NDgyOTlkOTVhMzQ1MDhlOTJhZDlkNDA2OWVkZjI5YTgxNjM3YjkxYTUyNmUiLCJpYXQiOjE3NjgzMzE0MzAuNzE3NjQ2LCJuYmYiOjE3NjgzMzE0MzAuNzE3NjQ5LCJleHAiOjQ5MjQwMDUwMzAuNzA0MDY1LCJzdWIiOiIyMDM0NTEyIiwic2NvcGVzIjpbXX0.WsZPCHSNc9sIbrZKR4ka5VgcpDdW08xCc8AWdcPd9oDMRvsjAvKuSsdg_FEL5q1haJV1toDczF6nfAR8rFQ9KSG8Trdatuy03n7oaqXzitZFKz7aeFD_3_rYLJz0WqPuoK6mqLwTv6wAB-t1z2Wy8e3KC-L_N1nlYuzhneFI5a4jxhc8ayUwxThbuxJvMd5sNipQWi4-OVeqbAF6dLgXF32Q33SvRn_dzw0Jy76871clSMGpMvzZ60fXMXLByhviyorE7dIP71dD1yFLDWyN8m3ED07r7ncnX__1PWuLxGs0qzC24W9FlCOIJJlQ_c0Lso_q2lFIAnPCK6I81uL16VpxGE3y0O-P21_c1Azj0Lwj-lSdmk0V1mhBy_YufJDkzEYHnXiIcoQdLvUfK1nUbFz9gg10MEVCPa0bXqRAmTYiNzwri2rQUF11JEBTQX_AWFEJgo-ikkHcC3ln81bvnSxwZrq3XEd2xIUDGOKD-qr2IBl866VSCDpGCfTuDKWd6-f36oNrdGa_mTfIKPbla31-ErUY4pdYSEAeVCZmhrXB-TzXOB8z0aQY9XR5S-2YH9C7c_4SJbErJLtGlPnd6hjUtqT42I1qY9SW4X59jgNtBo-MSAHC7-lVu5dAUm6Lnyz95UYjXR-lyJyg7oX9LgFi7ypmwNeG1wA-gX1Yau0';
const MAILERLITE_GROUP_ID = '176508406386918528';

// Define required custom fields
const REQUIRED_FIELDS = [
  { key: 'archetype', name: 'Archetype', type: 'TEXT' },
  { key: 'archetype_percent', name: 'Archetype Percent', type: 'NUMBER' },
  { key: 'test_date', name: 'Test Date', type: 'TEXT' },
  { key: 'archetype_1', name: 'Archetype 1', type: 'TEXT' },
  { key: 'archetype_1_percent', name: 'Archetype 1 Percent', type: 'NUMBER' },
  { key: 'archetype_2', name: 'Archetype 2', type: 'TEXT' },
  { key: 'archetype_2_percent', name: 'Archetype 2 Percent', type: 'NUMBER' },
  { key: 'archetype_3', name: 'Archetype 3', type: 'TEXT' },
  { key: 'archetype_3_percent', name: 'Archetype 3 Percent', type: 'NUMBER' }
];

// Function to ensure custom fields exist
async function ensureCustomFieldsExist() {
  try {
    console.log('🔍 Checking custom fields...');
    
    // Get existing fields
    const fieldsResponse = await fetch('https://connect.mailerlite.com/api/fields', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`
      }
    });
    
    if (!fieldsResponse.ok) {
      console.error('⚠️ Failed to fetch existing fields');
      return false;
    }
    
    const fieldsResult = await fieldsResponse.json();
    const existingFields = fieldsResult.data || [];
    const existingFieldKeys = existingFields.map(f => f.key);
    
    console.log('📋 Existing fields:', existingFieldKeys);
    
    // Create missing fields
    for (const field of REQUIRED_FIELDS) {
      if (!existingFieldKeys.includes(field.key)) {
        console.log(`➕ Creating field: ${field.key}`);
        
        const createResponse = await fetch('https://connect.mailerlite.com/api/fields', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${MAILERLITE_API_KEY}`
          },
          body: JSON.stringify({
            name: field.name,
            type: field.type
          })
        });
        
        if (createResponse.ok) {
          console.log(`✅ Created field: ${field.key}`);
        } else {
          const error = await createResponse.json();
          console.error(`❌ Failed to create field ${field.key}:`, error);
        }
      }
    }
    
    console.log('✅ All custom fields are ready');
    return true;
  } catch (error) {
    console.error('❌ Error ensuring custom fields:', error);
    return false;
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    // Ensure custom fields exist (only needs to run once, but checking is fast)
    await ensureCustomFieldsExist();

    // Extract request data
    const { email, name, archetype, archetypePercentage, top3Results } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email address required' });
    }

    console.log('📮 Adding to MailerLite:', email);
    console.log('🎯 Archetype:', archetype, '(' + archetypePercentage + '%)');console.log('📊 Top 3:', top3Results);

    // MailerLite API URL
    const apiUrl = 'https://connect.mailerlite.com/api/subscribers';
    
    // Prepare subscriber data with custom fields
    const subscriberData = {
      email: email,
      fields: {
        name: name || '',
        // Custom fields for personalization
        archetype: archetype || '',
        archetype_percent: archetypePercentage ? parseInt(archetypePercentage) : 0,
        test_date: new Date().toLocaleDateString('en-US'),
        // Top 3 archetypes for advanced segmentation
        archetype_1: top3Results?.[0]?.name || '',
        archetype_1_percent: top3Results?.[0]?.percentage || 0,
        archetype_2: top3Results?.[1]?.name || '',
        archetype_2_percent: top3Results?.[1]?.percentage || 0,
        archetype_3: top3Results?.[2]?.name || '',
        archetype_3_percent: top3Results?.[2]?.percentage || 0
      },
      // Add to specific group for automation trigger
      groups: [MAILERLITE_GROUP_ID]
    };
    
    console.log('📤 Sending to MailerLite:', JSON.stringify(subscriberData, null, 2));
    
    // Call MailerLite API
    const mailerLiteResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`
      },
      body: JSON.stringify(subscriberData)
    });
    
    const result = await mailerLiteResponse.json();
    console.log('📥 MailerLite response:', JSON.stringify(result, null, 2));
    
    if (mailerLiteResponse.ok) {
      console.log('✅ Successfully added to MailerLite');
      return res.status(200).json({ 
        success: true, 
        message: 'Successfully added',
        subscriber_id: result.data?.id
      });
    } else {
      // Subscriber already exists is not an error
      if (result.message && result.message.includes('already exists')) {
        console.log('👤 Contact already in MailerLite - updating...');
        
        // Update subscriber instead of creating new one
        const updateUrl = `https://connect.mailerlite.com/api/subscribers/${email}`;
        const updateResponse = await fetch(updateUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${MAILERLITE_API_KEY}`
          },
          body: JSON.stringify({ 
            fields: subscriberData.fields, 
            groups: subscriberData.groups 
          })
        });
        
        const updateResult = await updateResponse.json();
        console.log('📥 Update response:', JSON.stringify(updateResult, null, 2));
        
        if (updateResponse.ok) {
          console.log('✅ Contact data updated successfully');
          return res.status(200).json({ 
            success: true, 
            message: 'Contact updated',
            existing: true
          });
        } else {
          console.error('❌ Failed to update contact:', updateResult);
        }
      }
      
      console.warn('⚠️ MailerLite API Warning:', result.message || 'Unknown error');
      return res.status(400).json({ 
        success: false,
        error: result.message || 'Unknown error',
        details: result
      });
    }
  } catch (error) {
    console.error('❌ MailerLite serverless function error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
}
