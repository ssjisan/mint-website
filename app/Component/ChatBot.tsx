"use client";

import Script from "next/script";

export default function ChatBot() {
  return (
    <Script
      id="chatwoot-sdk"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(d,t) {
            var BASE_URL="https://app.unichat.com.bd";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: 'kf4Mv8NnNHVN4EhKkeR986AQ',
                baseUrl: BASE_URL
              })
            }
          })(document,"script");
        `,
      }}
    />
  );
}
