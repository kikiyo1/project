import React, { useEffect } from "react";

const MayarEmbedButton = () => {
  useEffect(() => {
    const existing = document.querySelector("script[src='https://mayarembed.r2.mayar.id/mayar-new-min.js']");
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://mayarembed.r2.mayar.id/mayar-new-min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="text-center mt-6">
      <a
        className="mayar-button iframe-lightbox-link"
        href="https://sisworo-74397.myr.id/pl/aplikasi-kasir-hd-solution?iframe=true"
        data-padding-bottom="30%"
        data-scrolling="true"
      >
        <span></span>
        Beli Sekarang
      </a>
    </div>
  );
};

export default MayarEmbedButton;
