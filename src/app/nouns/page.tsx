import { auth } from '@clerk/nextjs/server';

import CardFlip from '@/app/components/CardFlip';

const Nouns = () => {
  const { orgId } = auth().protect();

  return (
    <div>
      <CardFlip />
    </div>
  );
};

export default Nouns;
