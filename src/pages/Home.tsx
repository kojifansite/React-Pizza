import React from 'react';
import { useSelector } from 'react-redux';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { sortList } from '../components/Sort';

import { Skeleton, Sort, PizzaBlock, Pagination, Categories } from 'components';

import {
  setCategoryId,
  setCurPage,
  setFilters,
} from '../redux/slices/filter/slice';

import { useAppDispatch } from 'redux/store';
import { selectFilter } from 'redux/slices/filter/selectors';
import { selectPizzas } from 'redux/slices/pizzas/selectors';
import { SearchPizzaParams } from 'redux/slices/pizzas/types';
import { fetchPizzas } from 'redux/slices/pizzas/asyncActions';

const Home:React.FC = () => {

  import('utils/math').then((math)=> {
    console.log(math.add(12, 12));
  });
    
  const { items, status } = useSelector(selectPizzas);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    categoryId,
    sort: sortType,
    curPage,
    searchValue,
  } = useSelector(selectFilter);

  const onChangeCategory = React.useCallback((id:number) => {
    dispatch(setCategoryId(id));
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        curPage,
      });
      navigate(`/?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, curPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty == params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          curPage: Number(params.curPage),
          sort: sort || sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.sortProperty.replace('-', ''); 
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    
    dispatch(fetchPizzas({ curPage: String(curPage), category, sortBy, order, search }));
  };

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, curPage]);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items
    // .filter((obj) =>
    //   obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // )
    .map((obj:any) => <PizzaBlock key={obj.id} {...obj} />);

  const onChangePage = (page:number) => {
    dispatch(setCurPage(page));
  };

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sortType} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status == 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className='content__items'>
          {status == 'loading' ? skeleton : pizzas}
        </div>
      )}
      <Pagination curPage={curPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
