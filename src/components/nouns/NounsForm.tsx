'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { createNoun, updateNounById } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { dummyNounData } from '../../../constants';

interface Noun {
  id?: number;
  category: string;
  polish_word: string;
  english_word: string;
  image_url: string;
  notes: string;
}

interface NounsFormProps {
  currentNoun: Partial<Noun> | null;
  setCurrentNoun: React.Dispatch<React.SetStateAction<Noun>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  nounsToRender: Noun[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialNounFormData: Noun = {
  category: '',
  polish_word: '',
  english_word: '',
  image_url: '',
  notes: '',
};

const NounsForm: React.FC<NounsFormProps> = ({
  currentNoun,
  isEditing,
  setIsEditing,
  setOpen,
}) => {
  const [newNoun, setNewNoun] = useState<Partial<Noun>>({ ...currentNoun });
  const [newCategory, setNewCategory] = useState('');
  const categories = dummyNounData
    .map((item) => item.category)
    .filter((category, index, self) => self.indexOf(category) === index);

  const inputRef = useRef<HTMLInputElement>(null);

  const focusOnNounEntry = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    focusOnNounEntry();
  }, []);

  useEffect(() => {
    setNewNoun({ ...currentNoun });
  }, [currentNoun]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === 'newCategory') {
      setNewCategory(value);
    } else {
      const processedValue = name === 'category' ? value : value;

      setNewNoun({ ...newNoun, [name]: processedValue });

      if (name === 'category') {
        setNewCategory(value);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEditing) {
      try {
        if (currentNoun.id) {
          await updateNounById(currentNoun.id, newNoun);
        }
        setOpen(false);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating noun:', error);
      }
    } else {
      await createNoun(newNoun);
      setNewNoun({ ...initialNounFormData });
      setOpen(false);
    }
  };

  return (
    <div className="mx-auto shadow-formContainer relative max-w-[450px] w-full rounded-3xl p-12 bg-[#ecf0f3]">
      <Image
        src="https://tse2.mm.bing.net/th/id/OIG2.8sm7UoAuUTARlhnvdtq.?w=270&h=270&c=6&r=0&o=5&dpr=1.5&pid=ImgGn"
        alt="logo"
        height={100}
        width={100}
        className="mx-auto  rounded-full shadow-brandLogo"
      />
      <div className="py-4 font-extrabold text-[1.8rem] text-center text-[#1da1f2]">
        NOUNS
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full max-w-[600px] flex-col">
          {isEditing && (
            <div className="px-6 py-6">
              <Button size="full" variant="secondary" type="submit">
                Update Noun
              </Button>
            </div>
          )}
          <div className="flex flex-col">
            <label className="py-2" htmlFor="category">
              Category
            </label>
            <select
              className="shadow-formInput bg-[#ecf0f3] p-3 pl-6 h-12 text-md rounded-lg "
              name="category"
              value={newNoun.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="bg-[#1da1f2]/90"
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="flex justify-start py-2 pl-2">New Category</label>
            <input
              className="shadow-formInput bg-[#ecf0f3] p-3 pl-6 h-12 text-md rounded-3xl focus:outline-none focus:ring-1 focus:ring-gray-600"
              type="text"
              name="newCategory"
              placeholder="New Category"
              onChange={handleChange}
              value={newCategory}
            />
            <label className="flex justify-start py-2 pl-2">English</label>
            <input
              className="shadow-formInput bg-[#ecf0f3] p-3 pl-6 h-12 text-md rounded-3xl focus:outline-none focus:ring-1 focus:ring-gray-600"
              placeholder="English"
              id="english_word"
              type="text"
              name="english_word"
              required
              onChange={handleChange}
              value={newNoun.english_word}
            />
            <label className="flex justify-start py-2 pl-2">Polish</label>
            <input
              className="shadow-formInput bg-[#ecf0f3] p-3 pl-6 h-12 text-md rounded-3xl focus:outline-none focus:ring-1 focus:ring-gray-600"
              ref={inputRef}
              placeholder="Polish"
              id="polish_word"
              type="text"
              name="polish_word"
              required
              onChange={handleChange}
              value={newNoun.polish_word}
            />
            <label className="flex justify-start py-2 pl-2">Image URL</label>
            <input
              className="shadow-formInput bg-[#ecf0f3] p-3 pl-6 h-12 text-md rounded-3xl focus:outline-none focus:ring-1 focus:ring-gray-600"
              placeholder="Image URL"
              id="image_url"
              type="text"
              name="image_url"
              required
              onChange={handleChange}
              value={newNoun.image_url}
            />
            <label className="flex justify-start py-2 pl-2">Your notes</label>
            <textarea
              className="mt-2 custom-scrollbar mb-4 resize-none shadow-formInput bg-[#ecf0f3] p-3 pl-6 h-36 text-md rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
              id="notes"
              name="notes"
              placeholder={`Create a few sentences using the noun.`}
              onChange={handleChange}
              value={newNoun.notes}
            />
          </div>

          {!isEditing && (
            <div className="flex justify-center items-center mb-8 pt-4 w-full">
              <Button
                size="full"
                variant="primary"
                id="submit-verb-button"
                type="submit"
              >
                Create
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default NounsForm;
