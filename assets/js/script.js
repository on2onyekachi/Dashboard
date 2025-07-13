document.addEventListener('DOMContentLoaded', function(){
    document.body.classList.add('loading');

    // Mobile Sidebar Toggle
    const menuToggle = document.getElementById('menuToggle');
    const sideBar = document.getElementById('sideBar');
    const mobileOverlay = document.getElementById('mobileOverlay');

    menuToggle.addEventListener('click', function(){
        sideBar.classList.toggle('active');
        mobileOverlay.classList.toggle('active');

        // CHANGE ICON BASE ON STATE
        const icon = menuToggle.querySelector('i');
        if(sideBar.classList.contains('active')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times')
        }else{
            icon.classList.remove('fa-times')
            icon.classList.add('fa-bars');
        }
    })

    // CLOSE SIDEBAR WHEN CLICKING ON OVERLAY
    mobileOverlay.addEventListener('click', function(){
        sideBar.classList.remove('active')
        mobileOverlay.classList.remove('active')

        // change icon back to bars
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times')
        icon.classList.add('fa-bars');
    })

    // Theme Toggle Fuction
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function(){
        document.body.classList.toggle("dark-mode")
        // update icon and save
        const themeIcon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon')
            themeIcon.classList.add('fa-sun')
            // saving theme selected to local storage
            localStorage.setItem('theme', 'dark');
        }else{
            themeIcon.classList.remove('fa-sun')
            themeIcon.classList.add('fa-moon')
            // saving theme selected to local storage
            localStorage.setItem('theme', 'light');
        }
    })
    // close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e){
        const isClickInsideSidebar = sideBar.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);
        if(sideBar.classList.contains('active') && !isClickInsideSidebar && !isClickOnToggle){
            sideBar.classList.remove('active');
            mobileOverlay.classList.remove('active');
        }
        // change icon back to bars
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times')
        icon.classList.add('fa-bars');
    })

    // LOAD SAVE THEME FROM LOCALSTORAGE
    const savedTheme = localStorage.getItem('theme')
    if(savedTheme === 'dark'){
        document.body.classList.add('dark-mode');
        const themeIcon = document.querySelector('.theme-toggle i');
        themeIcon.classList.remove('fa-moon')
        themeIcon.classList.add('fa-sun')
    }

    // ADD HOVER EFFECT TO TASK BAR
    document.querySelectorAll('.task-bar').forEach(task=>{
        task.addEventListener('mouseenter', function(){
            this.style.zIndex = '10';
        });
        task.addEventListener('mouseleave', function(){
            this.style.zIndex = '1';
        })
    })

    // ANIMATE PROGRESS RING
    document.querySelectorAll('.progress-ring.progress-fill').forEach(ring=>{
        const circumference = 283; //"2*π*r
        const progressRing = ring.closest('.progress-ring');
        const progressText = progressRing.querySelector('.progress-text').textContent;
        const percentage = parseInt(progressText);
        const offset = circumference - (percentage * circumference/100);
        ring.style.strokeDashoffset = offset;
    })

})
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const dashboard = document.getElementById('dashboard');
    const spinner = document.querySelector('.spinner');
    setTimeout(() => {
        loader.classList.add('fade-out');
        dashboard.style.opacity = '1';
        spinner.style.animation = 'none';
        document.body.classList.remove('loading');
    }, 1000);
});