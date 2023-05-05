function NewArticleForm(col) {
  const newArticleBox = document.createElement('form');
  newArticleBox.className = 'form';

  col.appendChild(newArticleBox);
  const render = () => {
    newArticleBox.innerHTML = `
              <fieldset>
            <fieldset class="form-group">
              <input type="text" class="form-control form-control-lg" placeholder="Article Title" />
            </fieldset>
            <fieldset class="form-group">
              <input type="text" class="form-control" placeholder="What's this article about?" />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                class="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input type="text" class="form-control" placeholder="Enter tags" />
              <div class="tag-list"></div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="button">
              Publish Article
            </button>
          </fieldset>
        `;
  };

  render();
}
export default NewArticleForm;
