export interface VideoRecord {
  id: string;
  title: string;
  url: string;
  /** ISO 8601 */
  date: string;
  /** 顯示於前台的影片分類 */
  category: string;
  /** 前台封面圖網址（可為空，YouTube 則使用官方縮圖） */
  coverUrl: string;
}
