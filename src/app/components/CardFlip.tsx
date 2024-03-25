'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const cardDetails = [
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives amongst men',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives amongst men',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives amongst men',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives amongst men',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives amongst men',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives amongst men',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives amongst men',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives amongst men',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives amongst men',
  },
  {
    imageSrcFront:
      'https://tse4.mm.bing.net/th/id/OIG4.TplQWsiR0KujmlqJwIUG?pid=ImgGn',
    imageSourceBack:
      'https://tse4.mm.bing.net/th/id/OIG4.S.QJeiNsYCjkvaApqHQ8?pid=ImgGn',
    mainHeading: 'The King of Cats',
    description: 'This amazing creature lives amongst men',
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
      {cardDetails.map((card, index) => (
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
              <h3>{card.mainHeading}</h3>
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
            className="w-[100%] h-[100%] absolute text-white"
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
              <p>{card.description}</p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default CardFlip;
