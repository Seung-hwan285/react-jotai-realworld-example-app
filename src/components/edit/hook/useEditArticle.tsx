import React, { startTransition } from 'react';
import { useAtom } from 'jotai';
import { newArticleAtom } from '../../../lib/jotai/article';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticlesAPI } from '../../../lib/utils/request/articles';
import { ArticleInput } from '../../../lib/utils/type/article';

function useEditArticle() {
  const [newArticle, setNewArticle] = useAtom(newArticleAtom);

  const parms = useParams();

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    startTransition(() => {
      setNewArticle((prev: ArticleInput) => ({
        ...prev,
        [name]: value,
      }));
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      title: newArticle.title,
      description: newArticle.description,
      body: newArticle.body,
    };

    const { slug }: any = parms;

    try {
      await ArticlesAPI.updateArticle(slug, body);
      return navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return {
    newArticle,
    handleChange,
    handleSubmit,
  };
}
export default useEditArticle;
