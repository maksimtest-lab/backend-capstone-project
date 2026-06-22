import dayjs from 'dayjs';

export function getArticleDate(date: string) {
    return dayjs(date).format("MMM DD, YYYY");
}