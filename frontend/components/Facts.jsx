import React, { useState } from 'react';

const FAQsFactsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      id: 1,
      question: "महापंडित राहुल सांकृत्यायन कौन थे?",
      answer: "वे एक विद्वान, इतिहासकार, दार्शनिक और हिंदी यात्रा साहित्य के जनक थे। उन्हें विभिन्न भाषाओं और विषयों में गहन ज्ञान और लेखन कार्य के लिए जाना जाता है।"
    },
    {
      id: 2,
      question: "केंद्र क्या करता है?",
      answer: "यह केंद्र महापंडित राहुल सांकृत्यायन के कार्यों और दर्शन से जुड़ी शोध, शिक्षा और सांस्कृतिक संरक्षण गतिविधियों पर केंद्रित है।"
    },
    {
      id: 3,
      question: "मैं कैसे जुड़ सकता/सकती हूँ?",
      answer: "आप हमारे सेमिनार, कार्यशालाओं, शोध कार्यक्रमों में भाग लेकर या सांस्कृतिक व शैक्षणिक गतिविधियों में स्वयंसेवक बनकर जुड़ सकते हैं।"
    },
    {
      id: 4,
      question: "क्या यह केंद्र छात्रों और शोधकर्ताओं के लिए खुला है?",
      answer: "हाँ, यह केंद्र साहित्य, इतिहास, दर्शन और संस्कृति में रुचि रखने वाले छात्रों, शोधकर्ताओं और विद्वानों का स्वागत करता है।"
    },
    {
      id: 5,
      question: "इस संस्था को वित्तीय सहायता कहाँ से मिलती है?",
      answer: "यह संस्था दान, अनुदान, सरकारी सहायता और फंडरेजिंग गतिविधियों के माध्यम से अपने शोध व सांस्कृतिक कार्यक्रमों का संचालन करती है।"
    }
  ];

  const facts = [
    {
      label: "स्थापना वर्ष:",
      value: "2002"
    },
    {
      label: "मुख्य क्षेत्र:",
      value: "साहित्य, इतिहास, दर्शन, शिक्षा, महिला सशक्तिकरण, ग्रामीण विकास"
    },
    {
      label: "प्रमुख गतिविधियाँ:",
      value: "राष्ट्रीय संगोष्ठियाँ, सांस्कृतिक कार्यक्रम, शैक्षणिक कार्यशालाएँ"
    },
    {
      label: "नेतृत्व:",
      value: "डॉ. संगीता श्रीवास्तव (सचिव), पृथ्वीपाल पांडे (अध्यक्ष)"
    },
    {
      label: "स्थान:",
      value: "K-57/125, नवापुरा, वाराणसी, उत्तर प्रदेश"
    },
    {
      label: "पंजीकृत NGO:",
      value: "सोसाइटीज़ रजिस्ट्रेशन एक्ट, 1860 के अंतर्गत (पंजी. सं. 2267/2012-13)"
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* FAQ Section */}
          <div>
            <div className="mb-8">
              <h2 className="font-inter font-bold text-[70px] leading-[100%] tracking-[-0.06em]">
                प्रश्नोत्तर
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left py-4 flex items-center justify-between hover:text-orange-400 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <span className="text-orange-400 font-bold text-lg mr-3">
                        {faq.id}
                      </span>
                      <span className="text-lg font-medium text-gray-900">
                        {faq.question}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <svg
                        className={`w-5 h-5 transform transition-transform duration-200 ${
                          activeIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {activeIndex === index && (
                    <div className="pb-4 pl-8">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Facts Section */}
          <div>
            <div className="mb-8">
              <h2 className="font-inter font-bold text-[70px] leading-[100%] tracking-[-0.06em] text-right">
                तथ्य
              </h2>
            </div>

            <div className="space-y-6">
              {facts.map((fact, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {fact.label}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {fact.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQsFactsSection;
