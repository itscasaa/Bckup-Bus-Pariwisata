<?php
/**
 * Admin API: CRUD Paket Wisata
 *
 * GET    → list semua (termasuk nonaktif)
 * POST   action=tambah  → insert baru
 * POST   action=edit    → update by id
 * POST   action=hapus   → delete by id
 * POST   action=urutan  → update urutan (drag & drop)
 */

error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); exit;
}

$response = ['status' => 'error', 'message' => '', 'data' => []];

include_once '../../config/koneksi.php';

if (!isset($conn) || !$conn) {
    http_response_code(503);
    $response['message'] = 'Database connection not available.';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    // ── GET: list semua paket ───────────────────────────────────────────────
    if ($method === 'GET') {
        $result = mysqli_query($conn,
            "SELECT * FROM paket_wisata ORDER BY urutan ASC, id ASC"
        );
        $data = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = [
                'id'        => (int)$row['id'],
                'judul'     => $row['judul'],
                'badge'     => $row['badge'],
                'kategori'  => $row['kategori'],
                'durasi'    => $row['durasi'],
                'harga'     => (int)$row['harga'],
                'deskripsi' => $row['deskripsi'],
                'gambar'    => $row['gambar'],
                'status'    => $row['status'],
                'urutan'    => (int)$row['urutan'],
            ];
        }
        $response['status'] = 'success';
        $response['data']   = $data;

    // ── POST: tambah / edit / hapus ─────────────────────────────────────────
    } elseif ($method === 'POST') {
        $body   = json_decode(file_get_contents('php://input'), true) ?? [];
        $action = $body['action'] ?? $_POST['action'] ?? '';

        // ── TAMBAH ──────────────────────────────────────────────────────────
        if ($action === 'tambah') {
            $judul    = trim($body['judul']    ?? '');
            $badge    = trim($body['badge']    ?? '');
            $kategori = trim($body['kategori'] ?? '');
            $durasi   = trim($body['durasi']   ?? '');
            $harga    = (int)($body['harga']   ?? 0);
            $deskripsi= trim($body['deskripsi']?? '');
            $gambar   = trim($body['gambar']   ?? '');
            $status   = in_array($body['status'] ?? '', ['aktif','nonaktif']) ? $body['status'] : 'aktif';
            $urutan   = (int)($body['urutan']  ?? 0);

            if (!$judul || !$kategori || !$durasi) {
                $response['message'] = 'Field judul, kategori, dan durasi wajib diisi.';
                echo json_encode($response, JSON_UNESCAPED_UNICODE); exit;
            }

            // Auto badge jika kosong
            if (!$badge) $badge = 'PAKET ' . strtoupper($kategori);

            // Auto urutan jika 0
            if ($urutan === 0) {
                $r = mysqli_query($conn, "SELECT MAX(urutan) as m FROM paket_wisata");
                $urutan = ((int)mysqli_fetch_assoc($r)['m']) + 1;
            }

            $stmt = mysqli_prepare($conn,
                "INSERT INTO paket_wisata (judul, badge, kategori, durasi, harga, deskripsi, gambar, status, urutan)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
            );
            mysqli_stmt_bind_param($stmt, 'ssssisssi',
                $judul, $badge, $kategori, $durasi, $harga, $deskripsi, $gambar, $status, $urutan
            );
            if (!mysqli_stmt_execute($stmt)) throw new Exception(mysqli_stmt_error($stmt));

            $newId = mysqli_insert_id($conn);
            mysqli_stmt_close($stmt);

            $response['status']  = 'success';
            $response['message'] = 'Paket berhasil ditambahkan.';
            $response['data']    = ['id' => $newId];

        // ── EDIT ────────────────────────────────────────────────────────────
        } elseif ($action === 'edit') {
            $id       = (int)($body['id'] ?? 0);
            if (!$id) { $response['message'] = 'ID tidak valid.'; echo json_encode($response, JSON_UNESCAPED_UNICODE); exit; }

            $judul    = trim($body['judul']    ?? '');
            $badge    = trim($body['badge']    ?? '');
            $kategori = trim($body['kategori'] ?? '');
            $durasi   = trim($body['durasi']   ?? '');
            $harga    = (int)($body['harga']   ?? 0);
            $deskripsi= trim($body['deskripsi']?? '');
            $gambar   = trim($body['gambar']   ?? '');
            $status   = in_array($body['status'] ?? '', ['aktif','nonaktif']) ? $body['status'] : 'aktif';
            $urutan   = (int)($body['urutan']  ?? 0);

            if (!$badge) $badge = 'PAKET ' . strtoupper($kategori);

            $stmt = mysqli_prepare($conn,
                "UPDATE paket_wisata
                 SET judul=?, badge=?, kategori=?, durasi=?, harga=?, deskripsi=?, gambar=?, status=?, urutan=?
                 WHERE id=?"
            );
            mysqli_stmt_bind_param($stmt, 'ssssisssii',
                $judul, $badge, $kategori, $durasi, $harga, $deskripsi, $gambar, $status, $urutan, $id
            );
            if (!mysqli_stmt_execute($stmt)) throw new Exception(mysqli_stmt_error($stmt));
            mysqli_stmt_close($stmt);

            $response['status']  = 'success';
            $response['message'] = 'Paket berhasil diperbarui.';

        // ── HAPUS ────────────────────────────────────────────────────────────
        } elseif ($action === 'hapus') {
            $id = (int)($body['id'] ?? 0);
            if (!$id) { $response['message'] = 'ID tidak valid.'; echo json_encode($response, JSON_UNESCAPED_UNICODE); exit; }

            $stmt = mysqli_prepare($conn, "DELETE FROM paket_wisata WHERE id = ?");
            mysqli_stmt_bind_param($stmt, 'i', $id);
            if (!mysqli_stmt_execute($stmt)) throw new Exception(mysqli_stmt_error($stmt));
            mysqli_stmt_close($stmt);

            $response['status']  = 'success';
            $response['message'] = 'Paket berhasil dihapus.';

        } else {
            $response['message'] = 'Action tidak dikenal.';
        }

    } else {
        http_response_code(405);
        $response['message'] = 'Method not allowed.';
    }

} catch (Exception $e) {
    http_response_code(500);
    $response['message'] = 'Internal server error: ' . $e->getMessage();
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);
if (isset($conn) && $conn) mysqli_close($conn);
?>
