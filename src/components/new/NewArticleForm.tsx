import React from 'react';
import { Tag } from '../../lib/utils/type/article';
import useNewArticle from './hook/useNewArticle';

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
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      name="title"
                      value={newArticle.title}
                      onChange={handleChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      name="description"
                      value={newArticle.description}
                      onChange={handleChange}
                    />
                  </fieldset>
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
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      name="tagList"
                      value={tag}
                      onChange={handleTagChange}
                      onKeyPress={handleTagClick}
                    />
                    <div className="tag-list">
                      {!!tags &&
                        tags.map((tag: Tag, idx: number) => {
                          const string = tag as string;
                          return (
                            <div key={idx}>
                              <span
                                onClick={() => handleDeleteClick(tag)}
                                className="tag-pill tag-default"
                              >
                                {string} &nbsp; X
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </fieldset>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                  >
                    Publish Article
                  </button>
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
