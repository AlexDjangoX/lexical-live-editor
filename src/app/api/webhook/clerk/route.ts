// /* eslint-disable camelcase */
// import { Webhook, WebhookRequiredHeaders } from 'svix';
// import { IncomingHttpHeaders } from 'http';
// import { NextResponse } from 'next/server';
// import {
//   newUserKanban,
//   createUser,
//   deleteUser,
//   updateUser,
// } from '@/lib/actions/actions';
// import { headers } from 'next/headers';
// import { dummyData } from '@/constants';

// const webhookSecret = process.env.NEXT_CLERK_WEBHOOK_SECRET;

// type EventType = 'user.created' | 'user.updated' | 'user.deleted';

// type Event = {
//   data: {
//     id: string;
//     username: string;
//     first_name?: string;
//     last_name?: string;
//     image_url?: string;
//     email_addresses?: Record<string, string>[] | null | undefined;
//   };
//   object: 'event';
//   type: EventType;
// };

// export const POST = async (request: Request) => {
//   const payload = await request.json();
//   const payloadType: string = payload.type;
//   const header = headers();

//   const heads = {
//     'svix-id': header.get('svix-id'),
//     'svix-timestamp': header.get('svix-timestamp'),
//     'svix-signature': header.get('svix-signature'),
//   };

//   const wh = new Webhook(webhookSecret || '');

//   let evnt: Event | null = null;

//   try {
//     evnt = wh.verify(
//       JSON.stringify(payload),
//       heads as IncomingHttpHeaders & WebhookRequiredHeaders
//     ) as Event;
//   } catch (err) {
//     return NextResponse.json({ message: err }, { status: 400 });
//   }

//   if (payloadType === 'user.created') {
//     const { id, first_name, last_name, image_url, email_addresses } = evnt.data;
//     const emailAddress = email_addresses?.[0]?.email_address || '';

//     const user = await createUser({
//       clerkId: id,
//       fullName: `${first_name} ${last_name}`,
//       username: `${first_name} ${last_name}`,
//       email: emailAddress,
//       profileImage: image_url || '',
//     });

//     if (user) {
//       await newUserKanban({
//         clerkId: id,
//         kanbanData: dummyData,
//       });

//       return NextResponse.json({ data: user });
//     } else {
//       return NextResponse.json(
//         { error: 'Failed to create user' },
//         { status: 400 }
//       );
//     }
//   }

//   if (payloadType === 'user.updated') {
//     const { id, first_name, last_name, image_url, email_addresses } = evnt.data;
//     const emailAddress = email_addresses?.[0]?.email_address || '';

//     const updatedUser = await updateUser(id, {
//       clerkId: id,
//       fullName: `${first_name} ${last_name}`,
//       username: `${first_name} ${last_name}`,
//       email: emailAddress,
//       profileImage: image_url || '',
//     });

//     if (updatedUser) {
//       return NextResponse.json({ data: updatedUser });
//     } else {
//       return NextResponse.json(
//         { error: 'Failed to update user' },
//         { status: 400 }
//       );
//     }
//   }

//   if (payloadType === 'user.deleted') {
//     const { id } = evnt.data;

//     const deletedUser = await deleteUser(id.toString());

//     if (deletedUser) {
//       return NextResponse.json({ data: deletedUser });
//     } else {
//       return NextResponse.json(
//         { error: 'Failed to delete user' },
//         { status: 400 }
//       );
//     }
//   }

//   return NextResponse.json(
//     { message: 'Request processed successfully.' },
//     { status: 200 }
//   );
// };
