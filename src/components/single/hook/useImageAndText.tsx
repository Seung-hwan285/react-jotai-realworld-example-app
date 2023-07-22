import { useAtom } from 'jotai';
import { readOnlyImageAtom } from '../../../lib/jotai/user';
import { bodyAtom } from '../../../lib/jotai/article';
import { ImageAndTextData } from '../../../lib/utils/type/comment';

function useImageAndText() {
  const [image] = useAtom(readOnlyImageAtom);
  const imageElement = image && String(image);
  const [text, setBody] = useAtom(bodyAtom);

  return { imageElement, text, setBody } as unknown as ImageAndTextData;
}
export default useImageAndText;
