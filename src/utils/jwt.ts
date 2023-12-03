import jwt from 'jsonwebtoken';

export default function generateToken(object: object) {
  const secretKey = process.env.SECRET_KEY as string;
  const token = jwt.sign({ ...object }, secretKey, { expiresIn: '12h' });

  return token;
}
