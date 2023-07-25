import React, { startTransition, useState } from 'react';
import { useAtom } from 'jotai';
import { newArticleAtom } from '../../../lib/jotai/article';
import { useNavigate } from 'react-router-dom';
import { ArticlesAPI } from '../../../lib/utils/request/articles';
import { ArticleInput, Tag } from '../../../lib/utils/type/article';
import { asyncArticleAtom } from '../../../lib/jotai/async-atom';

function useNewArticle() {
  const [newArticle, setNewArticle] = useAtom(newArticleAtom);
  // const [asyncArticle, setAsyncArticle] = useAtom<any>(asyncArticleAtom);

  const [tags, setTags] = useState<Tag[]>([]);
  const [tag, setTag] = useState('');

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

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTag = e.target.value;
    setTag(newTag);
  };

  const handleTagClick = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setTags((prevTag) => [...prevTag, tag.trim() as unknown as Tag]);
      setTag('');
    }
  };

  const handleDeleteClick = (tagRemove: Tag) => {
    setTags((prev: Tag[]) => prev.filter((tag: Tag) => tag !== tagRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      title: newArticle.title,
      description: newArticle.description,
      body: newArticle.body,
      tags: tags as string[],
    };
    const { data } = await ArticlesAPI.createArticle(body);

    return navigate('/');
  };

  return {
    newArticle,
    tags,
    tag,
    handleChange,
    handleSubmit,
    handleDeleteClick,
    handleTagChange,
    handleTagClick,
  };
}
export default useNewArticle;
