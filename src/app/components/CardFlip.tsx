'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const cardDetails = [
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse2.mm.bing.net/th/id/OIG1.Qhbva8Hpc50cfjPdDNFj?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives!',
  },
  {
    imageSrcFront:
      'https://tse3.mm.bing.net/th/id/OIG1.CVqzbVyYnVGkh3B1oYFf?pid=ImgGn',
    imageSourceBack:
      'https://tse1.mm.bing.net/th/id/OIG1.380HcIQaNpA3tQhjYrNE?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives!',
  },
  {
    imageSrcFront:
      'https://tse2.mm.bing.net/th/id/OIG1.xNqL00LZfcGdmtXTCr1U?pid=ImgGn',
    imageSourceBack:
      'https://tse2.mm.bing.net/th/id/OIG1.Qhbva8Hpc50cfjPdDNFj?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives!',
  },
  {
    imageSrcFront:
      'https://tse1.mm.bing.net/th/id/OIG1.SdAx46tDvFTwWjM7Fodu?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG1.LunCiFj9OGFh9topeg7T?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives!',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse2.mm.bing.net/th/id/OIG1.QUtDf.yTTliIUYhDPUK4?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives!',
  },
  {
    imageSrcFront:
      'https://tse3.mm.bing.net/th/id/OIG1.cRV1N32kycMIX9IgdGXf?pid=ImgGn',
    imageSourceBack:
      'https://tse3.mm.bing.net/th/id/OIG3.VrUU3jYqVy3cjIywo_Qp?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives!',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse2.mm.bing.net/th/id/OIG3.8q8yRty.vdXvbxjfHcP5?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives!',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse3.mm.bing.net/th/id/OIG3.PilrxhRb7BVLXaeADNo6?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives!',
  },
  {
    imageSrcFront:
      'https://tse1.mm.bing.net/th/id/OIG3.ayulI85jAoVqZSTS6.Z6?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives!',
  },
  {
    imageSrcFront:
      'https://tse1.mm.bing.net/th/id/OIG3.rPSs09pFq2_jtPXpSD8Z?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives!',
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
    <div className="flex flex-wrap justify-center gap-1 p-4">
      {cardDetails.map((card, index) => {
        console.log(card.mainHeading);
        console.log(card.description);
        return (
          <div
            key={index}
            className="w-[300px] h-[300px] relative cursor-pointer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <motion.div
              className="w-[100%] h-[100%] absolute text-white"
              style={{ backfaceVisibility: 'hidden' }}
              animate={isFlipped[index] ? 'flipped' : 'unflipped'}
              variants={variants}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col items-center justify-normal">
                <h3 className="justify-center z-10 w-fit rounded-lg  bg-slate-300 font-bold flex text-md border-2 border-gray-400 text-black">
                  {card.mainHeading}
                </h3>
                <Image
                  src={card.imageSrcFront}
                  alt="word-image"
                  layout="fill"
                  objectFit="fit"
                  className="rounded-md border-2 border-gray-400 p-2"
                />
              </div>
            </motion.div>
            <motion.div
              className="w-[100%] h-[100%] absolute text-gray-500"
              style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
              animate={isFlipped[index] ? 'unflipped' : 'flipped'}
              variants={variants}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col items-center justify-normal">
                <Image
                  src={card.imageSourceBack}
                  alt="word-image"
                  layout="fill"
                  objectFit="fit"
                  className="rounded-md border-2 border-gray-400 p-2"
                />
                <div className="flex center-text items-center justify-center z-10 bg-slate-300 font-bold text-md border-2 border-gray-400 p-1 text-black">
                  <p>{card.description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default CardFlip;
