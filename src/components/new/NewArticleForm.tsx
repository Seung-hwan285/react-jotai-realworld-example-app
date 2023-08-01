import React from 'react';
import { PropsTag } from '../../lib/utils/type/article';
import useNewArticle from './hook/useNewArticle';
import InputField from '../common/InputField';
import Button from '../common/Button';

function NewArticleTags({ tags, handleDeleteClick }: PropsTag) {
  return (
    <div className="tag-list">
      {!!tags &&
        tags.map((tag: string) => {
          const s = tag as string;
          return (
            <div key={s}>
              <span
                onClick={() => handleDeleteClick?.(tag)}
                className="tag-pill tag-default"
              >
                {s} X
              </span>
            </div>
          );
        })}
    </div>
  );
}

function NewArticleForm() {
  const {
    tag,
    tags,
    newArticle,
    handleChange,
    handleTagClick,
    handleTagChange,
    handleSubmit,
    handleDeleteClick,
  } = useNewArticle();

  return (
    <>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <InputField
                    type="text"
                    placeholder="Article Title"
                    name="title"
                    onChange={handleChange}
                  />

                  <InputField
                    type="text"
                    placeholder="What's this article about?"
                    name="description"
                    value={newArticle.description}
                    onChange={handleChange}
                  />

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      name="body"
                      value={newArticle.body}
                      onChange={handleChange}
                      onKeyPress={handleTagClick}
                    />
                  </fieldset>

                  <InputField
                    type="text"
                    placeholder="Enter tags"
                    name="tagList"
                    value={tag}
                    onChange={handleTagChange}
                    onKeyPress={handleTagClick}
                  />

                  <NewArticleTags
                    tags={tags as string[]}
                    handleDeleteClick={handleDeleteClick}
                  />

                  <Button
                    onClick={handleSubmit}
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                  >
                    Publish Article
                  </Button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NewArticleForm;
