let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/program/reactnative/VideoSplitter/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +12 ~/program/reactnative/VideoSplitter/App.js
badd +38 screens/Home.js
badd +58 components/Utility.js
badd +127 components/VideoProcessing.js
badd +17 navigation/HomeStack.js
badd +39 components/HomeHeader.js
badd +24 components/HomeButtons.js
badd +1 components/ProgressOverlay.js
badd +3 styles/Global.js
badd +7 screens/Creations.js
badd +11 components/HeaderWithBackButton.js
badd +89 components/CreationsList.js
badd +32 screens/ViewCreation.js
badd +19 components/viewCreation/Splits.js
badd +12 components/viewCreation/SplitedVideos.js
badd +3 components/viewCreation/VideoMgmt.js
badd +1 components/QualitySelectOverlay.js
argglobal
%argdel
edit components/viewCreation/VideoMgmt.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '2resize ' . ((&lines * 1 + 23) / 47)
exe 'vert 2resize ' . ((&columns * 1 + 87) / 174)
exe '3resize ' . ((&lines * 1 + 23) / 47)
exe 'vert 3resize ' . ((&columns * 69 + 87) / 174)
argglobal
let s:l = 2 - ((1 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
2
normal! 0
wincmd w
argglobal
enew
wincmd w
argglobal
enew
wincmd w
exe '2resize ' . ((&lines * 1 + 23) / 47)
exe 'vert 2resize ' . ((&columns * 1 + 87) / 174)
exe '3resize ' . ((&lines * 1 + 23) / 47)
exe 'vert 3resize ' . ((&columns * 69 + 87) / 174)
tabnext 1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
