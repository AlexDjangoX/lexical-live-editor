'use server';

import { Role, Prisma, Noun } from '@prisma/client';

import {
  AddVerbProps,
  CreateUserProps,
  DummyNounDataInterface,
  NewUserKanbanProps,
  SpecificScrapeVerbType,
  VerbType,
} from '@/lib/types';
import { verifyAuth } from './auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { dummyNounData } from '../../constants';

type NounsData = Noun[] | DummyNounDataInterface[];

export async function createUser(data: CreateUserProps) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: data.clerkId,
      },
    });
    if (existingUser) {
      return null;
    }

    const user = await prisma.user.create({
      data: {
        ...data,
        role: data.role || Role.USER,
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function newUserKanban({
  clerkId,
  kanbanData,
}: NewUserKanbanProps) {
  try {
    if (kanbanData === null) {
      console.error('kanbanData is null, cannot create Kanban.');
      return;
    }

    await prisma.kanban.create({
      data: {
        kanbanObject: kanbanData,
        clerkId,
      },
    });
    console.log('Kanban created successfully for clerkId:', clerkId);
  } catch (error) {
    console.error('Error creating new Kanban:', error);
    throw error;
  }
}

export async function addVerbToUserKanban(verbObject: VerbType) {
  const { clerkId } = await verifyAuth(
    'You must be logged in to add a verb to your kanban.',
    false
  );
  if (!clerkId) {
    throw new Error('No clerkId');
  }

  try {
    const kanban = await prisma.kanban.findUnique({
      where: {
        clerkId,
      },
    });

    if (!kanban) {
      throw new Error('Kanban not found for the given clerkId');
    }

    let kanbanObject: any = {};

    if (
      kanban.kanbanObject !== null &&
      typeof kanban.kanbanObject === 'string'
    ) {
      kanbanObject = JSON.parse(kanban.kanbanObject);
    }

    if (!kanbanObject.column_A) {
      kanbanObject.column_A = { items: [] };
    }

    kanbanObject.column_A.items.push(verbObject);

    const updatedKanban = await prisma.kanban.update({
      where: {
        clerkId,
      },
      data: {
        kanbanObject: JSON.stringify(kanbanObject),
      },
    });

    return updatedKanban;
  } catch (error) {
    console.error('Error adding verb to user Kanban:', error);
    throw error;
  }
}

export async function getKanbanByLoggedInUserClerkId() {
  try {
    const { clerkId } = await verifyAuth(
      'You must be logged in to access a Kanban.',
      false
    );

    if (!clerkId) {
      throw new Error('Authentication failed: No clerkId found.');
    }
    const userKanban = await prisma.kanban.findUnique({
      where: {
        clerkId,
      },
    });
    if (!userKanban) {
      console.log('No Kanban found for the given clerkId:', clerkId);
      return null;
    }

    console.log('Kanban retrieved successfully for clerkId:', clerkId);
    return userKanban;
  } catch (error) {
    console.error('Error retrieving Kanban by clerkId:', error);
    throw error;
  }
}

export async function updateUser(clerkId: string, data: CreateUserProps) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        clerkId,
      },
      data,
    });

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function deleteUser(clerkId: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        clerkId,
      },
    });

    return deletedUser;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function addVerb(verbObject: AddVerbProps) {
  const { clerkId } = await verifyAuth(
    'You must be logged in to create a verb.',
    false
  );

  if (!clerkId) {
    throw new Error('No clerkId');
  }
  try {
    const newVerb = await prisma.verb.create({
      data: {
        verbObject,
        clerkId,
      },
    });

    return newVerb;
  } catch (error) {
    console.error('Error adding new verb:', error);
    throw error;
  }
}

export async function updateVerb(
  verbId: number,
  updateData: SpecificScrapeVerbType
) {
  const { clerkId } = await verifyAuth(
    'You must be logged in to update a verb.',
    false
  );

  if (!clerkId) {
    throw new Error('No clerkId provided.');
  }

  try {
    const existingVerb = await prisma.verb.findFirst({
      where: {
        id: verbId,
        clerkId,
      },
    });

    if (!existingVerb) {
      console.error(
        `Verb with ID ${verbId} not found or does not belong to the current user.`
      );
      throw new Error(
        `Verb with ID ${verbId} not found or does not belong to the current user.`
      );
    }

    const prismaUpdateData: Prisma.VerbUpdateInput = {
      verbObject: updateData,
    };

    const updatedVerb = await prisma.verb.update({
      where: { id: verbId },
      data: prismaUpdateData,
    });

    revalidatePath('/board');
    console.log('Verb updated successfully:', updatedVerb);
    return updatedVerb;
  } catch (error) {
    console.error('Error updating verb:', error);
    throw error;
  }
}

export async function getVerbByInfinitive(polishWord: string) {
  const { clerkId } = await verifyAuth(
    'You must be logged in to view a verb.',
    false
  );
  if (!clerkId) {
    throw new Error('No clerkId');
  }
  try {
    const matchedVerb: any[] = await prisma.$queryRaw`
      SELECT * FROM "Verb"
      WHERE "verbObject"->>'polish_word' = ${polishWord}
    `;

    let verbPlusInfinitive = null;

    if (matchedVerb[0]) {
      verbPlusInfinitive = {
        ...matchedVerb[0].verbObject,
        polish_word: polishWord,
      };
    }

    return verbPlusInfinitive || null;
  } catch (error) {
    console.error('Error retrieving verb by infinitive:', error);
    throw error;
  }
}

export async function getAllPolishVerbs() {
  try {
    const verbs = (await prisma.verb.findMany()) as any[];

    const polishVerbs: string[] = verbs
      .map((verb) => verb.verbObject?.polish_word || '')
      .filter(Boolean);

    return polishVerbs;
  } catch (error) {
    console.error('Error retrieving all Polish verbs:', error);
    throw error;
  }
}

export async function createNoun(nounData: Partial<Noun>): Promise<Noun> {
  const { clerkId } = await verifyAuth(
    'You must be logged in to create a noun.',
    false
  );

  if (!clerkId) {
    throw new Error('No clerkId');
  }
  console.log(clerkId);
  console.log(nounData);
  try {
    const newNoun = await prisma.noun.create({
      data: {
        ...nounData,
        clerkId,
      } as Noun,
    });
    await prisma.$disconnect();
    revalidatePath('/nouns');
    return newNoun;
  } catch (error) {
    console.error('Error creating new noun:', error);
    throw error;
  }
}

export async function getNoun(id: number): Promise<Noun | null> {
  const { clerkId } = await verifyAuth(
    'You must be logged in to view a noun.',
    false
  );

  if (!clerkId) {
    throw new Error('No clerkId');
  }

  try {
    const noun = await prisma.noun.findUnique({
      where: { id },
    });

    return noun;
  } catch (error) {
    console.error('Error fetching noun:', error);
    throw error;
  }
}

export async function updateNounById(
  id: number,
  updatedData: Prisma.NounUpdateInput
): Promise<void> {
  const { clerkId } = await verifyAuth(
    'You must be logged in to update a noun.',
    false
  );

  if (!clerkId) {
    throw new Error('No clerkId');
  }

  console.log(updatedData);

  try {
    await prisma.noun.update({
      where: { id },
      data: updatedData,
    });

    revalidatePath('/nouns');
  } catch (error) {
    console.error('Error updating noun:', error);
    throw error;
  }
}

export async function deleteNounById(id: number): Promise<void> {
  const { clerkId } = await verifyAuth(
    'You must be logged in to delete a noun.',
    false
  );

  if (!clerkId) {
    throw new Error('No clerkId');
  }

  try {
    await prisma.noun.delete({
      where: { id },
    });

    revalidatePath('/nouns');
  } catch (error) {
    console.error('Error deleting noun:', error);
    throw error;
  }
}

export async function getNounsByUserId(): Promise<{
  nouns: NounsData;
  categories: string[];
}> {
  try {
    const { clerkId } = await verifyAuth(
      'You must be logged in to get all nouns by clerkId.',
      false
    );

    if (!clerkId) {
      return { nouns: dummyNounData, categories: [] };
    }

    const nouns = await prisma.noun.findMany({
      where: { clerkId },
    });
    console.log(nouns);
    const categories = nouns
      .map(
        (item) => item.category.charAt(0).toUpperCase() + item.category.slice(1)
      )
      .filter((category, index, self) => self.indexOf(category) === index);

    return { nouns, categories };
  } catch (error) {
    console.error('Error fetching nouns by user ID:', error);
    throw error;
  }
}
