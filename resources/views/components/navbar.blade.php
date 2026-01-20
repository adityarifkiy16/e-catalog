 <!-- Navbar -->
 <nav class="main-header navbar navbar-expand navbar-white navbar-light">
     <!-- Left navbar links -->
     <ul class="navbar-nav">
         <li class="nav-item">
             <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
         </li>
         <li class="nav-item d-none d-sm-inline-block">
             <a href="{{ route('dashboard') }}" class="nav-link">Home</a>
         </li>
         <li class="nav-item d-none d-sm-inline-block">
             <a href="{{ config('app.url') }}" class="nav-link" target="__blank">Catalog</a>
         </li>
         <li class="nav-item d-none d-sm-inline-block">
             <a href="https://osborn.id" class="nav-link" target="__blank">Landing Page</a>
         </li>
     </ul>

     <!-- Right navbar links -->
     <ul class="navbar-nav ml-auto">
         <!-- User Profile Dropdown -->
         <li class="nav-item dropdown">
             <a class="nav-link" data-toggle="dropdown" href="#">
                 <i class="fas fa-user"></i>
             </a>
             <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                 <div class="dropdown-divider"></div>
                 <form action="{{ route('logout') }}" method="POST" class="d-inline">
                     @csrf
                     <button type="submit" class="dropdown-item">
                         <i class="fas fa-sign-out-alt mr-2"></i> Logout
                     </button>
                 </form>
             </div>
         </li>
     </ul>
 </nav>
