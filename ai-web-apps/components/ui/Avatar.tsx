import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

const Avatar = async () => {
  const session = await getServerSession();
  if (!session || !session.user?.image) return null;
  return (
    <div className="avatar online mx-6 hidden lg:inline">
      <div className="w-[55px] rounded-full">
        <Image src={session.user.image} alt="avatar" width={25} height={25} />
      </div>
    </div>
  );
};

export default Avatar;
