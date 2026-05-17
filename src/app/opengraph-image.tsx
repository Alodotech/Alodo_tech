import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';
 
export const alt = 'ALODO TECH';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
 
export default async function Image() {
  const logoData = fs.readFileSync(path.join(process.cwd(), 'public', 'logo', 'logo.png'));
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoSrc} height={80} style={{ marginRight: '24px' }} alt="Logo" />
          <div
            style={{
              fontSize: '80px',
              fontWeight: '900',
              color: 'white',
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            ALODO <span style={{ color: '#EC663B', marginLeft: '16px' }}>TECH</span>
          </div>
        </div>
        <p
          style={{
            fontSize: '32px',
            color: '#a1a1aa',
            marginTop: '40px',
            maxWidth: '800px',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          L'infrastructure digitale de l'économie réelle.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
