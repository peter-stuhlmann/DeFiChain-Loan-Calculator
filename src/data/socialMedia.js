import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const socialMedia = [
  {
    media: 'Telegram',
    icon: <TelegramIcon />,
    href: 'https://t.me/share/url?url=https%3A%2F%2Fdefichain-loan-calculator.vercel.app&text=DeFiChain%20Kredit-Rechner',
  },
  {
    media: 'WhatsApp',
    icon: <WhatsAppIcon />,
    href: 'https://wa.me/?text=https://defichain-loan-calculator.vercel.app',
  },
  {
    media: 'Twitter',
    icon: <TwitterIcon />,
    href: 'https://twitter.com/share?text=%24DFI%20%23RoadTo50%20%40DeFiChain%20%40Peter_Stuhlmann%0D&url=https://defichain-loan-calculator.vercel.app',
  },
  {
    media: 'Facebook',
    icon: <FacebookIcon />,
    href: 'http://www.facebook.com/sharer.php?u=https://defichain-loan-calculator.vercel.app',
  },
  {
    media: 'LinkedIn',
    icon: <LinkedInIcon />,
    href: 'https://www.linkedin.com/shareArticle?url=https://defichain-loan-calculator.vercel.app&title=DeFiChain%20Kredit-Rechner',
  },

  {
    media: 'E-Mail',
    icon: <EmailIcon />,
    href: 'mailto:?subject=DeFiChain%20Kredit-Rechner&body=Hallo!%20Mit%20diesem%20Rechner%20kannst%20Du%20ganz%20einfach%20berechnen%20wie%20hoch%20Deine%20Kreditsumme%20bei%20Deinem%20hinterlegten%20Collateral%20maximal%20sein%20darf%20und%20welche%20Preisschwankungen%20zu%20einer%20Liquidierung%20Deines%20Vaults%20führen.%0D%0Dhttps://defichain-loan-calculator.vercel.app',
  },
];

export default socialMedia;
