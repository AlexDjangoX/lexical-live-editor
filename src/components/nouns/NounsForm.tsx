'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './nounsForm.module.css';
import { createNoun, updateNounById } from '@/lib/actions/actions';

const initialNounFormData = {
  category: '',
  polish_word: '',
  english_word: '',
  image_url: '',
  notes: '',
};

const NounsForm = ({
  currentNoun,
  setCurrentNoun,
  isEditing,
  setIsEditing,
  nounsToRender,
  setOpen,
}) => {
  const [newNoun, setNewNoun] = useState({ ...initialNounFormData });
  const categories = nounsToRender
    .map((item) => item.category)
    .filter((category, index, self) => self.indexOf(category) === index);

  const inputRef = useRef();

  const focusOnNounEntry = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    focusOnNounEntry();
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    const processedValue =
      name === 'category'
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;

    if (isEditing) {
      setCurrentNoun((previous) => ({
        ...previous,
        [name]: processedValue,
      }));
    } else {
      setNewNoun({ ...newNoun, [name]: processedValue });
    }
  };

  const createNewNoun = async () => {
    await createNoun(newNoun);
    setNewNoun({ ...initialNounFormData });
    setOpen(false);
  };

  const updateNoun = async () => {
    try {
      if (isEditing) {
        await updateNounById(currentNoun.id, currentNoun);
      }
      setOpen(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating noun:', error);
    }
  };

  return (
    <>
      <div className={styles['form-wrapper']}>
        <form onSubmit={createNewNoun}>
          <div className={styles['noun-form-input-wrapper']}>
            {isEditing && (
              <div className={styles['close-modal-button']}>
                <button onClick={updateNoun}>
                  {isEditing ? 'Update Noun' : 'Editing'}
                </button>
              </div>
            )}
            <div className={styles['noun-form-input-category']}>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                defaultValue={
                  isEditing ? currentNoun.category : newNoun.category
                }
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles['noun-form-input-new-category']}>
              <label htmlFor="newCategory">New Category</label>
              <input
                type="text"
                name="category"
                defaultValue={
                  isEditing ? currentNoun.category : newNoun.category
                }
                onChange={handleChange}
              />
            </div>
            <div className={styles['noun-form-input-english-word']}>
              <label htmlFor="english_word">English</label>
              <input
                placeholder="English"
                id="english_word"
                type="text"
                name="english_word"
                required
                onChange={handleChange}
                defaultValue={
                  isEditing ? currentNoun.english_word : newNoun.word
                }
              />
            </div>
            <div className={styles['noun-form-input-polish-word']}>
              <label htmlFor="polish_word">Polish</label>
              <input
                ref={inputRef}
                placeholder="Polish"
                id="polish_word"
                type="text"
                name="polish_word"
                required
                onChange={handleChange}
                defaultValue={
                  isEditing ? currentNoun.polish_word : newNoun.word
                }
              />
            </div>
            <div className={styles['noun-form-input-image']}>
              <label htmlFor="image_url">Image URL</label>
              <input
                placeholder="Image URL"
                id="image_url"
                type="text"
                name="image_url"
                required
                onChange={handleChange}
                defaultValue={
                  isEditing ? currentNoun.image_url : newNoun.image_url
                }
              />
            </div>

            <div className={styles['noun-form-input-notes']}>
              <label htmlFor="notes">Your notes</label>
              <textarea
                id="notes"
                name="notes"
                rows="4"
                cols="50"
                placeholder={`Create a few sentences using the noun.`}
                fontFamily="Work sans"
                fontSize="28px"
                onChange={handleChange}
                value={isEditing ? currentNoun.notes : newNoun.notes}
              />
            </div>
            {!isEditing && (
              <div className={styles['create-noun-submit-button']}>
                <button id="submit-verb-button" type="submit">
                  Create
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default NounsForm;
