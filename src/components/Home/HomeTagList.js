import { tag_request } from '../../lib/tag/request.js';

function HomeTagList(row) {
  const render = async () => {
    const { tags } = await tag_request.getTagsList();
    const col = document.createElement('div');
    col.className = 'col-md-3';

    col.innerHTML = `
     <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">                         
               ${
                 Array.isArray(tags) &&
                 tags
                   .map((tag) => {
                     return /* HTML */ `
                       <a href="" class="tag-pill tag-default">${tag}</a>
                     `;
                   })
                   .join('')
               }
          </div>
        </div>
    `;

    row.appendChild(col);
  };

  render();
}

export default HomeTagList;
