export const useFileReader = (onLoad: (result: string) => void) => {
    let reader: FileReader
    
    //読み取り完了後に実行したい処理
    // onLoadはaddEventListenerに渡すためにもらってきた関数だが、
    // 念の為、読み込み結果がstringであることを確認してから呼び出すことにする
    const handleLoad = () => {
      if(typeof reader.result === "string"){
        onLoad(reader.result)
      }
    }
  
    reader = new FileReader
    reader.addEventListener("load", handleLoad)
  
    // onUnmounted(() => {
      // 忘れずにアンマウントでイベントリスナーを外しておかないとメモリリーク
      // reader?.removeEventListener("load", handleLoad)
    // })
  
    // readAsDataURLを使えば読み込み結果をData URLに変換してくれる
    const read = (blob: Blob) => reader.readAsDataURL(blob)
    
    return {
      read
    }
  }