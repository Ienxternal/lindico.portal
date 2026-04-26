import { useEffect, useMemo, useState } from 'react';
import { IdCard } from 'lucide-react';
import QRCode from 'qrcode';

export function ContactSaveControl({
  className = '',
  label = null,
  filename = 'contact.vcf',
  mecard,
  vcard,
}) {
  const [contactQrCode, setContactQrCode] = useState('');
  const contactQrPayload = useMemo(() => mecard, [mecard]);
  const contactVCard = useMemo(() => vcard, [vcard]);

  useEffect(() => {
    let isMounted = true;

    QRCode.toDataURL(contactQrPayload, {
      errorCorrectionLevel: 'L',
      margin: 1,
      width: 168,
      color: {
        dark: '#bda188',
        light: '#0000',
      },
    })
      .then((dataUrl) => {
        if (isMounted) {
          setContactQrCode(dataUrl);
        }
      })
      .catch(() => {
        if (isMounted) {
          setContactQrCode('');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [contactQrPayload]);

  function handleSaveContact() {
    const file = new Blob([contactVCard], { type: 'text/vcard;charset=utf-8' });
    const fileUrl = URL.createObjectURL(file);
    const link = document.createElement('a');

    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
  }

  return (
    <div className={`portal-contact-vcard-wrap${className ? ` ${className}` : ''}`}>
      <button
        type="button"
        className="portal-contact-vcard-button"
        aria-label="Save project manager contact"
        onClick={handleSaveContact}
      >
        <IdCard size={18} strokeWidth={1.8} />
        {label ? <span className="portal-contact-vcard-button-label">{label}</span> : null}
      </button>
      <div className="portal-contact-vcard-popover" aria-hidden="true">
        <span className="portal-contact-vcard-popover-label">Scan or Click</span>
        <span className="portal-contact-vcard-popover-frame">
          {contactQrCode ? (
            <img src={contactQrCode} alt="" className="portal-contact-qr-image" />
          ) : (
            <span className="portal-contact-qr-placeholder" />
          )}
        </span>
      </div>
    </div>
  );
}
