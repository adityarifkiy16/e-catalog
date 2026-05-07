<div class="user-panel mt-3 pb-3 mb-3 d-flex">
    <div class="image mr-3">
        <img src="{{ auth()->user()->path_image ? asset('storage/' . auth()->user()->path_image) : asset('dist/img/profile.png') }}"
            class="img-circle elevation-1" alt="User Image" style="width: 40px; height: 40px;">
    </div>
    <div class="d-flex align-items-center">
        <div class="d-flex flex-column">
            <span
                class="font-weight-bold text-white text-truncate">{{ auth()->user()->name ? auth()->user()->name : auth()->user()->username }}</span>
            <span class="text-muted small">{{ auth()->user()->role->name ?? "-" }}</span>
        </div>
    </div>
</div>
