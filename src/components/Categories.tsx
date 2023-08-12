import React from 'react';
import classNames from 'classnames';

interface CategoriesProps {
  value: number,
  onChangeCategory: (index: number) => void,
}

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {

  const categories:string[] = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className='categories'>
      <ul>
        {categories &&
          categories.map((categoryName, index) => (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={classNames({
                active: value == index,
              })}
            >
              {categoryName}
            </li>
          ))}
      </ul>
    </div>
  );
});
