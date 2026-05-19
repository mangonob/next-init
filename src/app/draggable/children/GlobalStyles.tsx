export default function GlobalStyles() {
  return (
    <style>{`
      body {
        background: var(--monitor-content-background);
      }

      /* 整体滚动条 */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      /* 轨道 */
      ::-webkit-scrollbar-track {
        background: transparent;
      }

      /* 滑块 */
      ::-webkit-scrollbar-thumb {
        background: rgba(60, 60, 67, 0.3);
        border-radius: 999px;
        border: 2px solid transparent;
        background-clip: content-box;
      }

      /* hover 时更明显一点 */
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(60, 60, 67, 0.45);
        border: 2px solid transparent;
        background-clip: content-box;
      }

      /* 右下角交汇处 */
      ::-webkit-scrollbar-corner {
        background: transparent;
      }
  `}</style>
  )
}
