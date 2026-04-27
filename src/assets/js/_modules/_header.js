import $ from "jquery";

export default () => {
    
    document.addEventListener('DOMContentLoaded', function () {
        const header = document.querySelector('.common-header');
        const liItems = header.querySelectorAll('.common-header__inner li[date-tag]');
        const contentBlocks = header.querySelectorAll('.header-contents__links');

        function clearAll() {
            liItems.forEach(li => li.classList.remove('active'));
            contentBlocks.forEach(block => block.classList.remove('show'));
        }

        liItems.forEach(li => {
            li.addEventListener('click', function (e) {
                e.stopPropagation();
                const tag = li.getAttribute('date-tag');

                clearAll();
                li.classList.add('active');
                const targetBlock = header.querySelector(`.header-contents__links[date-tag="${tag}"]`);
                if (targetBlock) {
                    targetBlock.classList.add('show');
                }
            });
        });

        // クリック外し検出
        document.addEventListener('click', function (e) {
            if (!header.contains(e.target)) {
                clearAll();
            }
        });
    });
}