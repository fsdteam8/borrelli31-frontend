import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { BsGlobe } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";

export default function Topbar() {
  return (
    <div>
      <div className="bg-[#131313] text-white text-sm py-2">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="">
            <MdOutlineMailOutline className="inline mr-2  h-5 w-5" />
            <Link href="mailto: cb@borrelliroofing.com">
              cb@borrelliroofing.com
            </Link>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Link href="#">
              <Facebook className="h-5 w-5" />
            </Link>

            <Link href="#">
              <Instagram className="h-5 w-5" />
            </Link>

            <Link href="#">
              <FaLinkedinIn className="h-5 w-5" />
            </Link>

            <Link href="#">
              <FaXTwitter className="h-5 w-5" />
            </Link>
            <Link href="#">
              <BsGlobe className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
