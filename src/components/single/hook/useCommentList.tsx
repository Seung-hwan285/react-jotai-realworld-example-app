import React, { useEffect, useState } from 'react';
import { getLocalStroage } from '../../../lib/utils/storage';

function useCommentList() {
  const [iconClass, setIconClass] = useState<React.ReactNode>(null);
  const token = getLocalStroage('token');

  useEffect(() => {
    const icon = token ? <i data-set="${id}" className="ion-trash-a" /> : '';
    setIconClass(icon);
  }, []);

  return {
    iconClass,
    token,
  };
}
export default useCommentList;
