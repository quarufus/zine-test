<script>
    import Pigeon from "$lib/images/pigeon.png";
</script>

<img src={Pigeon} alt="A pigeon" />

<style>
    img {
        position: relative;
        height: 80dvh;
        width: auto;
        align-self: center;
        left: 50%;
        transform: translateX(-50%);
        /*
        top: 50%;
        transform: translateY(-50%);
        z-index: -1;
        opacity: 0.5;
        filter: blur(10px); */
    }
</style>

