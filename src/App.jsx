import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './app.module.css';

// Определение схемы валидации с помощью Yup
const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email обязателен')
    .email('Некорректный email'),
  password: Yup.string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен быть не менее 6 символов'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли не совпадают')
    .required('Повтор пароля обязателен'),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange', // Валидировать при каждом изменении
    resolver: yupResolver(schema),
  });

  // Создаём ref для кнопки
  const submitButtonRef = useRef(null);

  // useEffect срабатывает, когда меняется `isValid`
  useEffect(() => {
    // Если форма валидна, устанавливаем фокус на кнопку
    if (isValid && submitButtonRef.current) {
      submitButtonRef.current.focus();
    }
  }, [isValid]); // Зависимость isValid

  const onSubmit = (data) => {
    console.log('Данные формы:', data);
    // Очистка формы после отправки
    reset();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* Поле Email */}
        <input
          className={styles.input}
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && <div className={styles.error}>{errors.email.message}</div>}

        {/* Поле пароль */}
        <input
          className={styles.input}
          type="password"
          placeholder="Пароль"
          {...register('password')}
        />
        {errors.password && <div className={styles.error}>{errors.password.message}</div>}

        {/* Повтор пароля */}
        <input
          className={styles.input}
          type="password"
          placeholder="Повтор пароля"
          {...register('repeatPassword')}
        />
        {errors.repeatPassword && (
          <div className={styles.error}>{errors.repeatPassword.message}</div>
        )}

        {/* Кнопка зарегистрироваться */}
        <button
          ref={submitButtonRef} // Привязываем ref к кнопке
          className={styles.button}
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default App;
