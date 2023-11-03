import * as moment from 'moment';
import { diskStorage } from 'multer';

export function getMinuteEvery(step: number) {
  const minute: string[] = [];
  let label: string = '';

  for (let i = 0; i < 60; i += step) {
    if (i < 10) {
      label = '0' + i;
    } else {
      label = '' + i;
    }
    minute.push(label);
  }

  return minute;
}

export function getHour() {
  const hour: string[] = [];
  let label: string = '';

  for (let i = 0; i < 24; i++) {
    if (i < 10) {
      label = '0' + i;
    } else {
      label = '' + i;
    }
    hour.push(label);
  }

  return hour;
}

export function parseDateToMomentString(
  format: string,
  value?: string,
): string | null {
  if (!value) {
    return null;
  }

  const date = moment(value, format, true);

  return date.format() === 'Invalid date' ? null : date.format('YYYY-MM-DD');
}

export function textareaToLines(value: string): string[] {
  return value
    .split(new RegExp('\\n|\\r|\\r\\n', 'g'))
    .filter((value) => {
      return value.trim() !== '';
    })
    .map((line) => line.trim());
}

export function uploadFileTmp() {
  return {
    storage: diskStorage({
      destination: `./uploads`,
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
      },
    }),
  };
}

export function UploadFileDb(originalname: string): string {
  const pathFile = process.env.PATH_FILE || 'http://localhost:3000/';
  return `${pathFile}uploads/${originalname}`;
}
