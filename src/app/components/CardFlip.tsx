'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { BarChart, Minus, Plus } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import NounsForm from '@/components/nouns/NounsForm';

const cardDetails = [
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse2.mm.bing.net/th/id/OIG1.Qhbva8Hpc50cfjPdDNFj?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description:
      'Cats are not only adorable but also therapeutic companions, reducing stress and anxiety for those who spend time with them. Whether it’s their adorable faces, tiny paws, or their playful antics, cats bring joy and warmth to our lives. ',
  },
  {
    imageSrcFront:
      'https://tse3.mm.bing.net/th/id/OIG1.CVqzbVyYnVGkh3B1oYFf?pid=ImgGn',
    imageSourceBack:
      'https://tse1.mm.bing.net/th/id/OIG1.380HcIQaNpA3tQhjYrNE?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description:
      'Cats are not only adorable but also therapeutic companions, reducing stress and anxiety for those who spend time with them. Whether it’s their adorable faces, tiny paws, or their playful antics, cats bring joy and warmth to our lives. ',
  },
  {
    imageSrcFront:
      'https://tse2.mm.bing.net/th/id/OIG1.xNqL00LZfcGdmtXTCr1U?pid=ImgGn',
    imageSourceBack:
      'https://tse2.mm.bing.net/th/id/OIG1.Qhbva8Hpc50cfjPdDNFj?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description:
      'Cats are not only adorable but also therapeutic companions, reducing stress and anxiety for those who spend time with them. Whether it’s their adorable faces, tiny paws, or their playful antics, cats bring joy and warmth to our lives. ',
  },
  {
    imageSrcFront:
      'https://tse1.mm.bing.net/th/id/OIG1.SdAx46tDvFTwWjM7Fodu?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG1.LunCiFj9OGFh9topeg7T?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description:
      'Cats are not only adorable but also therapeutic companions, reducing stress and anxiety for those who spend time with them. Whether it’s their adorable faces, tiny paws, or their playful antics, cats bring joy and warmth to our lives. ',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse2.mm.bing.net/th/id/OIG1.QUtDf.yTTliIUYhDPUK4?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description:
      'Cats are not only adorable but also therapeutic companions, reducing stress and anxiety for those who spend time with them. Whether it’s their adorable faces, tiny paws, or their playful antics, cats bring joy and warmth to our lives. ',
  },
  {
    imageSrcFront:
      'https://tse3.mm.bing.net/th/id/OIG1.cRV1N32kycMIX9IgdGXf?pid=ImgGn',
    imageSourceBack:
      'https://tse3.mm.bing.net/th/id/OIG3.VrUU3jYqVy3cjIywo_Qp?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description:
      'Cats are not only adorable but also therapeutic companions, reducing stress and anxiety for those who spend time with them. Whether it’s their adorable faces, tiny paws, or their playful antics, cats bring joy and warmth to our lives. ',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse2.mm.bing.net/th/id/OIG3.8q8yRty.vdXvbxjfHcP5?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description:
      'Cats are not only adorable but also therapeutic companions, reducing stress and anxiety for those who spend time with them. Whether it’s their adorable faces, tiny paws, or their playful antics, cats bring joy and warmth to our lives. ',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse3.mm.bing.net/th/id/OIG3.PilrxhRb7BVLXaeADNo6?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description:
      'Cats are not only adorable but also therapeutic companions, reducing stress and anxiety for those who spend time with them. Whether it’s their adorable faces, tiny paws, or their playful antics, cats bring joy and warmth to our lives. ',
  },
  {
    imageSrcFront:
      'https://tse1.mm.bing.net/th/id/OIG3.ayulI85jAoVqZSTS6.Z6?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description:
      'Cats are not only adorable but also therapeutic companions, reducing stress and anxiety for those who spend time with them. Whether it’s their adorable faces, tiny paws, or their playful antics, cats bring joy and warmth to our lives. ',
  },
  {
    imageSrcFront:
      'https://tse1.mm.bing.net/th/id/OIG3.rPSs09pFq2_jtPXpSD8Z?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description:
      'Cats are not only adorable but also therapeutic companions, reducing stress and anxiety for those who spend time with them. Whether it’s their adorable faces, tiny paws, or their playful antics, cats bring joy and warmth to our lives. ',
  },
];

const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(
    Array(cardDetails.length).fill(false)
  );

  const handleMouseEnter = (index: number) => {
    setIsFlipped((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });
  };

  const handleMouseLeave = (index: number) => {
    setIsFlipped((prev) => {
      const copy = [...prev];
      copy[index] = false;
      return copy;
    });
  };

  const variants = {
    flipped: { rotateY: 180 },
    unflipped: { rotateY: 0 },
  };

  return (
    <>
      <Drawer>
        <div className="flex justify-center p-4">
          <DrawerTrigger asChild>
            <Button variant="secondary">Add Noun</Button>
          </DrawerTrigger>
        </div>
        <DrawerContent className="custom-scrollbar overflow-scroll">
          <div className="relative">
            <NounsForm />
            <DrawerClose className="absolute inset-x-0 bottom-4 w-full flex justify-center">
              <Button>Cancel</Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
      <div className="flex h-full bg-[#f1f3f6] flex-wrap justify-center gap-12 p-4">
        {cardDetails.map((card, index) => {
          return (
            <div
              key={index}
              className="w-[300px] h-[300px] relative cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <motion.div
                className="w-[100%] h-[100%] absolute text-white shadow-nounCard rounded-md bg-[#f1f3f6]"
                style={{ backfaceVisibility: 'hidden' }}
                animate={isFlipped[index] ? 'flipped' : 'unflipped'}
                variants={variants}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={card.imageSrcFront}
                  alt="word-image"
                  layout="fill"
                  objectFit="fit"
                  className="rounded-md p-4"
                />
              </motion.div>
              <motion.div
                className="w-[100%] h-[100%] absolute text-gray-500 rounded-md shadow-nounCard bg-[#f1f3f6]"
                style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
                animate={isFlipped[index] ? 'unflipped' : 'flipped'}
                variants={variants}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col mt-4 items-center justify-normal">
                  <h3 className="justify-start w-fit shadow-formInput p-3  rounded-lg font-semiBold flex text-md border-2 text-gray-900">
                    {card.mainHeading}
                  </h3>
                  <div className="flex shadow-formInput p-3 mx-4 rounded-lg mt-8 center-text items-center justify-center text-gray-900">
                    <p className="leading-[1.45rem] text-left">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CardFlip;
