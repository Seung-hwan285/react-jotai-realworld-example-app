import { article_request } from '../../lib/article/request.js';

function HomeRow(HomeContainer) {
  const RowContainer = document.createElement('div');
  RowContainer.className = 'Row__Container';

  const Col1 = document.createElement('div');
  const Col2 = document.createElement('div');

  RowContainer.append(Col1);
  HomeContainer.append(RowContainer);
  const fetch = async () => {
    const req = await article_request.getAllArticles();
  };

  const render = async () => {
    Col1.innerHTML = `
      <div class="feed-toggle"> 
        <ul class="outline-active">
        <li class="nav-item">
        <a class="nav-link">Global Feed</a>
</li>
</ul>
      
</div>
    `;
  };
  fetch();
  render();
}
export default HomeRow;
