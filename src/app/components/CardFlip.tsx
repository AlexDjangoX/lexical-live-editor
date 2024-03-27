'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import NounsForm from '@/components/nouns/NounsForm';
import { deleteNounById, updateNounById } from '@/lib/actions';
import { cardDetails } from '../../../constants';
import { Noun } from '@prisma/client';

const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(
    Array(cardDetails.length).fill(false)
  );

  const [deleteNoun, setDeleteNoun] = useState(
    Array(cardDetails.length).fill(false)
  );

  const [activeIndex, setActiveIndex] = useState(-1);
  const [editingNoun, setEditingNoun] = useState<Partial<Noun> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  const onPrepareToDelete = (index: number) => {
    setDeleteNoun((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });
  };

  const onCancelDelete = (index: number) => {
    setDeleteNoun((prev) => {
      const copy = [...prev];
      copy[index] = false;
      return copy;
    });
  };

  console.log(activeIndex);

  const onConfirmDelete = async (index: number) => {
    try {
      await deleteNounById(index);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
    setIsFlipped((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });
  };

  const handleMouseLeave = (index: number) => {
    setActiveIndex(-1);
    setIsFlipped((prev) => {
      const copy = [...prev];
      copy[index] = false;
      return copy;
    });
  };

  const handleEditNoun = (noun: Noun, index: number) => {
    console.log(noun);
    setEditingNoun(noun);
    setIsEditing(true);
    setActiveIndex(index);
    setOpen(true);
  };

  const handleFormSubmit = async ({
    updatedData,
  }: {
    updatedData: Partial<Noun>;
  }) => {
    if (editingNoun && editingNoun.id !== undefined) {
      await updateNounById(editingNoun.id, updatedData);
    }
    setEditingNoun(null);
  };
  const variants = {
    flipped: { rotateY: 180 },
    unflipped: { rotateY: 0 },
  };
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <div className="flex justify-center p-4">
          <DrawerTrigger asChild>
            <Button variant="secondary">Add Noun</Button>
          </DrawerTrigger>
        </div>
        <DrawerContent className="custom-scrollbar overflow-scroll">
          <div className="relative">
            <NounsForm
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              currentNoun={editingNoun}
              onSubmit={handleFormSubmit}
            />
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
              className="w-[300px] h-[350px] relative cursor-pointer"
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
                  {activeIndex === index && (
                    <div className="flex p-2 justify-between w-full py-2 px-8">
                      {!deleteNoun[index] ? (
                        <Button
                          variant="danger"
                          onClick={() => onPrepareToDelete(index)}
                        >
                          Delete
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="danger"
                            onClick={() => onCancelDelete(index)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => onConfirmDelete(index)}
                          >
                            Confirm
                          </Button>
                        </>
                      )}
                      {!deleteNoun[index] && (
                        <Button
                          variant="secondary"
                          onClick={() => handleEditNoun(card, index)}
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  )}
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
