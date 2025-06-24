<div>
    <h5>Informasi Role</h5>
    <table class="table table-sm table-bordered">
        <tr>
            <th>ID</th>
            <td>{{ $role->id }}</td>
        </tr>
        <tr>
            <th>Nama</th>
            <td>{{ $role->name }}</td>
        </tr>
        <tr>
            <th>Permissions</th>
            <td>
                @foreach ($role->permissions as $permission)
                    <span class="badge badge-primary">{{ $permission->custom_name }}</span>{{ !$loop->last ? ' ' : '' }}
                @endforeach
            </td>
        </tr>
        <tr>
            <th>Deskripsi</th>
            <td>{{ $role->description ?? '-' }}</td>
        </tr>
        <tr>
            <th>Dibuat pada</th>
            <td>{{ $role->created_at->format('d M Y H:i') }}</td>
        </tr>
        <tr>
            <th>Diubah pada</th>
            <td>{{ $role->updated_at->format('d M Y H:i') }}</td>
        </tr>
    </table>
</div>
