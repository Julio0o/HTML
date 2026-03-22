document.addEventListener('DOMContentLoaded', () => {
    let isLogin = true;

    const authForm = document.getElementById('auth-form');
    const formContainer = document.getElementById('form-container');

    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    const registerFields = document.getElementById('register-fields');
    const submitBtn = document.getElementById('submit-btn');
    const toggleLink = document.getElementById('toggle-link');
    const forgotPassword = document.getElementById('forgot-password');
    const spacer = document.getElementById('spacer');
    const socialAction = document.getElementById('social-action');

    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const edadInput = document.getElementById('edad');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const toggleFormState = () => {
        isLogin = !isLogin;
        
        emailInput.value = '';
        passwordInput.value = '';
        nombreInput.value = '';
        apellidosInput.value = '';
        edadInput.value = '';

        if (isLogin) {
            formTitle.textContent = 'Bienvenido';
            formSubtitle.textContent = 'Ingresa tus datos para continuar';
            submitBtn.textContent = 'Inicia Sesión';
            toggleLink.textContent = 'Crear cuenta';
            socialAction.textContent = 'inicia sesión';
            registerFields.style.display = 'none';
            
            nombreInput.removeAttribute('required');
            apellidosInput.removeAttribute('required');
            edadInput.removeAttribute('required');

            forgotPassword.style.display = 'inline';
            spacer.style.display = 'none';
        } else {
            formTitle.textContent = 'Crear Cuenta';
            formSubtitle.textContent = 'Registra tus datos para unirte';
            submitBtn.textContent = 'Crear cuenta';
            toggleLink.textContent = 'Ya tengo una cuenta';
            socialAction.textContent = 'regístrate';
            registerFields.style.display = 'block';

            nombreInput.setAttribute('required', 'required');
            apellidosInput.setAttribute('required', 'required');
            edadInput.setAttribute('required', 'required');
            
            forgotPassword.style.display = 'none';
            spacer.style.display = 'inline';
        }
    };

    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        formContainer.classList.remove('animate__fadeInRight', 'animate__fadeInLeft');
        const exitAnimation = isLogin ? 'animate__fadeOutLeft' : 'animate__fadeOutRight';
        const enterAnimation = isLogin ? 'animate__fadeInRight' : 'animate__fadeInLeft';

        formContainer.classList.add('animate__animated', exitAnimation, 'animate__faster');

        formContainer.addEventListener('animationend', function handleAnimationEnd() {
            formContainer.removeEventListener('animationend', handleAnimationEnd);
            formContainer.classList.remove(exitAnimation);
            
            toggleFormState();

            formContainer.classList.add(enterAnimation);
        }, { once: true });
    });

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!isLogin && (!nombreInput.value || !apellidosInput.value || !edadInput.value)) {
            Swal.fire({
                title: 'Oops...',
                text: 'Por favor, completa todos los campos personales',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo',
                confirmButtonColor: '#d33'
            });
            return;
        }

        if (!emailInput.value || !passwordInput.value) {
            Swal.fire({
                title: 'Oops...',
                text: 'Por favor, completa todos los campos',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo',
                confirmButtonColor: '#d33'
            });
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(passwordInput.value)) {
            Swal.fire({
                title: 'Contraseña no válida',
                text: 'La contraseña debe tener al menos 8 caracteres y contener una combinación de letras y números.',
                icon: 'warning',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#f8bb86'
            });
            return;
        }

        if (isLogin) {
            Swal.fire({
                title: '¡Éxito!',
                text: 'Intentando iniciar sesión para: ' + emailInput.value,
                icon: 'info',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6'
            });
        } else {
            Swal.fire({
                title: '¡Cuenta creada con éxito!',
                text: 'Bienvenido, ' + nombreInput.value + ' ' + apellidosInput.value + '!',
                icon: 'success',
                confirmButtonText: 'Ir a la tienda',
                confirmButtonColor: '#a04000'
            }).then(() => {
                window.location.href = '../index.html';
            });
        }
    });
});