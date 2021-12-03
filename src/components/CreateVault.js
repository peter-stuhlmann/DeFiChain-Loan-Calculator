import React from 'react';

import Step from './styled/Step';
import Heading from './styled/Heading';
import Text from './styled/Text';

export default function CreateVault() {
  return (
    <Step>
      <Heading>1. Schritt: Vault erstellen</Heading>
      <Text>
        Hier entstehen Kosten in Höhe von 2 DFI. Ein DFI wird geburned, der
        andere wird beim Auflösen des Vaults zurückerstattet. Hinzu kommen noch
        die Transaktionsgebühren.
      </Text>
    </Step>
  );
}
