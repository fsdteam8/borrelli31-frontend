import React from "react";

export default function ServiceArea() {
  return (
    <div className="bg-[#E7E7E752]">
      <div className="pt-12">
        <div className="text-center">
          <h1 className=" text-4xl font-bold text-[#063668] mb-2">
            Service Area
          </h1>
          <p className="text-[#2F2F2F]/75 text-[18px]">
            Proudly serving the Greater Houston Metro Area and 
            surrounding suburbs
          </p>
        </div>

        <div className="h-80 lg:h-[500px] rounded-lg overflow-hidden shadow-lg my-8 md:my-14">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d887103.2547956005!2d-95.85092969099995!3d29.71260110814096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sHouston%20Metro!5e0!3m2!1sen!2sbd!4v1756230647977!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          />
        </div>

      </div>
    </div>
  );
}
