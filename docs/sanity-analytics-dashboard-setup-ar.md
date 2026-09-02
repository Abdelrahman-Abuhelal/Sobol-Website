# إعداد لوحة إحصائيات المقالات في Sanity Studio

تظهر الأداة باسم **إحصائيات المقالات** في القائمة الرئيسية لـ Sanity Studio. لا يحتاج محررو المحتوى إلى حساب Google Analytics؛ الخادم يقرأ البيانات بحساب خدمة ويعرض مؤشرات مجمعة فقط.

## 1. تجهيز Google Cloud

1. افتح أو أنشئ مشروعاً في Google Cloud Console.
2. فعّل **Google Analytics Data API**.
3. أنشئ Service Account ثم مفتاحاً بصيغة JSON.
4. احتفظ بقيمتي `client_email` و`private_key` من الملف. لا تضع ملف JSON داخل المستودع.

## 2. منح حساب الخدمة صلاحية القراءة

1. افتح Google Analytics ثم اختر GA4 Property الخاصة بالموقع.
2. انتقل إلى **Admin → Property access management**.
3. أضف بريد حساب الخدمة بدور **Viewer**.
4. انسخ رقم Property ID، وهو رقم فقط وليس Measurement ID الذي يبدأ بـ `G-`.

## 3. متغيرات بيئة الاستضافة

أضف القيم التالية إلى Vercel أو بيئة الاستضافة، للإنتاج والمعاينة عند الحاجة:

```env
GA4_PROPERTY_ID=123456789
GOOGLE_ANALYTICS_CLIENT_EMAIL=sobol-analytics@example-project.iam.gserviceaccount.com
GOOGLE_ANALYTICS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

أعد نشر الموقع بعد إضافة القيم. هذه المتغيرات خادمية ولا تبدأ بـ `NEXT_PUBLIC_`، لذلك لا تصل إلى المتصفح.

## 4. مؤشرات المشاركة وإكمال القراءة

لعرض توزيع المشاركة وإكمال 90% من المقال، أنشئ في GA4 من **Admin → Data display → Custom definitions** بُعدين من نوع Event:

- الاسم: `Share channel`، ومعلمة الحدث: `share_channel`.
- الاسم: `Scroll percent`، ومعلمة الحدث: `scroll_percent`.

قد تحتاج التعريفات الجديدة إلى 24–48 ساعة قبل ظهورها في تقارير API. تبقى بقية اللوحة عاملة خلال هذه المدة.

## الحماية والخصوصية

- مسار البيانات يتحقق من رمز جلسة مستخدم Sanity قبل الاتصال بـ Google.
- مفاتيح حساب الخدمة لا تُرسل إلى Studio أو إلى المتصفح.
- تعرض اللوحة بيانات مجمعة مثل القرّاء والمشاهدات والوقت، ولا تعرض أسماء الزوار أو بياناتهم الشخصية.
