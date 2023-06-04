import * as fs from 'fs';
import crypto from 'crypto';
import { AES, enc } from 'crypto-ts';

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

function decryptWithAudioKey(
  audioFilePath: string,
  encryptedFilePath: string
): void {
  const audioBinary = fs.readFileSync(audioFilePath);
  const encryptedMessage = fs.readFileSync(encryptedFilePath).toString('utf-8');

  const key = fs.readFileSync('C:/Users/felip/Desktop/TrabSexta/key.bin');
  const keyWordArray = enc.Hex.parse(key.toString('hex'));

  const decryptedMessage = xorBuffers(
    audioBinary,
    Buffer.from(AES.decrypt(encryptedMessage, keyWordArray).toString())
  );

  const randomBits = decryptedMessage.slice(
    0,
    audioBinary.length - decryptedMessage.length
  );
  const originalText = decryptedMessage.slice(audioBinary.length);

  const decryptedText = xorBuffers(randomBits, originalText).toString('utf-8');

  console.log('Texto descriptografado:', decryptedText);
  fs.writeFileSync(decryptedText, 'decrypted.txt');
}

const audioFile = 'C:/Users/felip/Desktop/TrabSexta/build/audio.mp3';
const encryptedFile = 'encrypted.txt';

decryptWithAudioKey(audioFile, encryptedFile);
