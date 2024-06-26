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

export const imageFileFilter = (req, file, cb) => {
  if (!/^image\/.+$/.test(file.mimetype)) {
    req.fileValidationError = new Error('Not a Image File!');
    return cb(null, false);
  }
  cb(null, true);
};

export const xlsxFileFilter = (req, file, cb) => {
  if (
    file.mimetype !==
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    req.fileValidationError = new Error('Not a Xlsx File!');
    return cb(null, false);
  }
  cb(null, true);
};

export const converToDayOfWeek = (day: number): string => {
  switch (day) {
    case 0:
      return 'Chủ nhật';
    case 1:
      return 'Thứ 2';
    case 2:
      return 'Thứ 3';
    case 3:
      return 'Thứ 4';
    case 4:
      return 'Thứ 5';
    case 5:
      return 'Thứ 6';
    case 6:
      return 'Thứ 7';
    default:
      return '';
  }
}

export const convertTimeToShift = (time: string): number => {
  const hour = parseInt(time.split(':')[0]);
  if (hour >= 5 && hour < 12) {
    return 0
  } else if (hour >= 12 && hour < 17) {
    return 1
  } else {
    return 2
  }
}
