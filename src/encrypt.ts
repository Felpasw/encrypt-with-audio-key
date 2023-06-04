import * as fs from 'fs';
import crypto from 'crypto';
import { AES } from 'crypto-ts';

function sumBuffers(buffer1: Buffer, buffer2: Buffer): Buffer {
  const concatenatedBuffer = Buffer.concat([
    Uint8Array.from(buffer1),
    Uint8Array.from(buffer2),
  ]);
  return Buffer.from(concatenatedBuffer);
}

function xorBuffers(buffer1: Buffer, buffer2: Buffer): Buffer {
  const resultBuffer = Buffer.alloc(buffer1.length);
  buffer1.forEach((byte, index) => {
    resultBuffer[index] = byte ^ buffer2[index];
  });
  return resultBuffer;
}

function encryptWithAudioKey(text: string, audioFilePath: string): string {
  const audioBinary = fs.readFileSync(audioFilePath);
  const textBinary = Buffer.from(text, 'utf8');

  if (audioBinary.length > textBinary.length) {
    const randomBits = crypto.randomBytes(
      audioBinary.length - textBinary.length
    );
    fs.writeFileSync('key.bin', randomBits);

    console.log('Tamanho dos random bits:' + randomBits.length);

    const textBinaryUpdate = sumBuffers(randomBits, textBinary);

    console.log('Tamanho do texto depois da soma: ' + textBinaryUpdate.length);

    const key = fs
      .readFileSync('C:/Users/felip/Desktop/TrabSexta/key.bin')
      .toString('utf-8');

    const encryptedMessage = AES.encrypt(
      xorBuffers(audioBinary, textBinaryUpdate).toString('utf-8'),
      key
    ).toString();

    return encryptedMessage;
  } else {
    return '';
  }
}

const plaintext = 'Hello World!';
const audioFile = 'C:/Users/felip/Desktop/TrabSexta/build/BIG CRACK.mp3';
fs.writeFileSync(encryptWithAudioKey(plaintext, audioFile), 'encrypted.txt');
